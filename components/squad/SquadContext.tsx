'use client';

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useStore } from '@/store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { RealtimeChannel } from '@supabase/supabase-js';
import { getItemById } from '@/data/mockData';
import SimplePeer from 'simple-peer';

export interface Participant {
  id: string;
  name: string;
  isSpeaking?: boolean;
}

export interface Reaction {
  id: string;
  emoji: string;
  senderId: string;
  timestamp: number;
}

interface SquadContextType {
  isConnected: boolean;
  roomId: string | null;
  participants: Participant[];
  reactions: Reaction[];
  joinRoom: (roomId?: string) => string;
  leaveRoom: () => void;
  broadcastFittingUpdate: (itemId: string | null, brandId: string | null) => void;
  sendReaction: (emoji: string) => void;
  toggleVoice: () => void;
  isVoiceActive: boolean;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const SquadContext = createContext<SquadContextType | null>(null);

export function SquadProvider({ children }: { children: React.ReactNode }) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const channelRef = useRef<RealtimeChannel | null>(null);
  const myIdRef = useRef<string>('');
  const peersRef = useRef<Record<string, SimplePeer.Instance>>({});
  const localStreamRef = useRef<MediaStream | null>(null);

  const { setSelectedItem, setSelectedBrand } = useStore();

  useEffect(() => {
    myIdRef.current = uuidv4();
    return () => {
        // 스트림 정리
        if(localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  useEffect(() => {
     if (isMuted && localStreamRef.current) {
         localStreamRef.current.getAudioTracks().forEach(track => track.enabled = false);
     } else if (!isMuted && localStreamRef.current) {
         localStreamRef.current.getAudioTracks().forEach(track => track.enabled = true);
     }
  }, [isMuted]);

  const createPeer = useCallback((peerId: string, initiator: boolean, stream: MediaStream | null) => {
    if (peersRef.current[peerId]) {
        // 이미 존재함
        return peersRef.current[peerId];
    }

    const peer = new SimplePeer({
        initiator,
        trickle: false,
        stream: stream || undefined,
    });

    peer.on('signal', (signal) => {
        if (!channelRef.current) return;
        channelRef.current.send({
            type: 'broadcast',
            event: 'signal',
            payload: { signal, to: peerId, from: myIdRef.current }
        });
    });

    peer.on('stream', (remoteStream) => {
        // 오디오 요소 생성
        const audio = document.createElement('audio');
        audio.srcObject = remoteStream;
        audio.autoplay = true;
        audio.style.display = 'none';
        document.body.appendChild(audio);
    });

    peer.on('close', () => {
        delete peersRef.current[peerId];
    });

    peer.on('error', () => {
        // 피어 에러 처리 (로그 삭제)
    });

    peersRef.current[peerId] = peer;
    return peer;
  }, []);

  const joinRoom = useCallback((existingRoomId?: string) => {
    const newRoomId = existingRoomId || uuidv4();
    setRoomId(newRoomId);

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase.channel(`squad:${newRoomId}`, {
      config: {
        presence: {
          key: myIdRef.current,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users: Participant[] = [];
        for (const key in newState) {
           users.push({ id: key, name: `User ${key.slice(0, 4)}` });
        }
        setParticipants(users);
      })
      .on('presence', { event: 'join' }, ({ key }) => {
        // 새 사용자 입장. 연결된 상태라면 통화 시작.
        if (key !== myIdRef.current) {
            createPeer(key, true, localStreamRef.current);
        }
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
         if (peersRef.current[key]) {
             peersRef.current[key].destroy();
             delete peersRef.current[key];
         }
      })
      .on('broadcast', { event: 'fitting_update' }, ({ payload }) => {
         if (payload.senderId === myIdRef.current) return;
         if (payload.brandId) setSelectedBrand(payload.brandId);
         if (payload.itemId) {
           const item = getItemById(payload.itemId);
           if (item) setSelectedItem(item);
         }
      })
      .on('broadcast', { event: 'reaction' }, ({ payload }) => {
        const reaction = { ...payload, timestamp: Date.now() };
        setReactions(prev => [...prev, reaction]);
        setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== reaction.id));
        }, 3000);
      })
      .on('broadcast', { event: 'signal' }, ({ payload }) => {
          if (payload.to === myIdRef.current) {
              const peerId = payload.from;
              const signal = payload.signal;

              // 피어가 없으면 제안(Offer)이므로 응답(Answer) 처리 (initiator: false)
              const peer = peersRef.current[peerId] || createPeer(peerId, false, localStreamRef.current);
              peer.signal(signal);
          }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          channel.track({
            online_at: new Date().toISOString(),
            device: 'web'
          });
        }
      });

    // 데모/검증을 위한 폴백 (실제 Supabase 없이 테스트)
    setTimeout(() => {
        setIsConnected(true);
    }, 500);

    channelRef.current = channel;
    return newRoomId;
  }, [setSelectedItem, setSelectedBrand, createPeer]);

  const leaveRoom = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    // 피어 제거
    Object.values(peersRef.current).forEach(peer => peer.destroy());
    peersRef.current = {};

    // 스트림 중지
    if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
    }

    setRoomId(null);
    setIsConnected(false);
    setParticipants([]);
    setIsVoiceActive(false);
  }, []);

  const broadcastFittingUpdate = useCallback((itemId: string | null, brandId: string | null) => {
    if (!channelRef.current || !isConnected) return;
    channelRef.current.send({
      type: 'broadcast',
      event: 'fitting_update',
      payload: { itemId, brandId, senderId: myIdRef.current }
    });
  }, [isConnected]);

  const sendReaction = useCallback((emoji: string) => {
    if (!channelRef.current || !isConnected) return;
    const reactionId = uuidv4();
    const payload = { id: reactionId, emoji, senderId: myIdRef.current };

    setReactions(prev => [...prev, { ...payload, timestamp: Date.now() }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== reactionId));
    }, 3000);

    channelRef.current.send({
      type: 'broadcast',
      event: 'reaction',
      payload: payload
    });
  }, [isConnected]);

  const toggleVoice = useCallback(async () => {
      if (isVoiceActive) {
          // 끄기
          if (localStreamRef.current) {
              localStreamRef.current.getTracks().forEach(track => track.stop());
              localStreamRef.current = null;
          }
          setIsVoiceActive(false);
      } else {
          // 켜기
          try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              localStreamRef.current = stream;
              setIsVoiceActive(true);

              // 기존 피어에 스트림 추가
              Object.values(peersRef.current).forEach(peer => {
                  peer.addStream(stream);
              });
          } catch (err) {
              // 마이크 접근 에러
              setIsVoiceActive(false);
          }
      }
  }, [isVoiceActive]);

  return (
    <SquadContext.Provider value={{
      isConnected,
      roomId,
      participants,
      reactions,
      joinRoom,
      leaveRoom,
      broadcastFittingUpdate,
      sendReaction,
      toggleVoice,
      isVoiceActive,
      isMuted,
      setIsMuted
    }}>
      {children}
    </SquadContext.Provider>
  );
}

export const useSquad = () => {
  const context = useContext(SquadContext);
  if (!context) throw new Error('useSquad must be used within SquadProvider');
  return context;
};
