'use client';

import React, { useEffect, useState } from 'react';
import { useSquad } from './SquadContext';
import { motion, AnimatePresence } from 'framer-motion';

export function SquadUI() {
  const {
    isConnected,
    joinRoom,
    leaveRoom,
    participants,
    sendReaction,
    reactions,
    roomId,
    toggleVoice,
    isVoiceActive
  } = useSquad();

  const [showInvite, setShowInvite] = useState(false);

  // 마운트 시 URL에 방 정보가 있으면 확인
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam && !isConnected && !roomId) {
        joinRoom(roomParam);
      }
    }
  }, [joinRoom, isConnected, roomId]);

  const handleCreateRoom = () => {
    const newId = joinRoom();
    // 새로고침 없이 URL 업데이트
    const url = new URL(window.location.href);
    url.searchParams.set('room', newId);
    window.history.pushState({}, '', url);
    setShowInvite(true);
    setTimeout(() => setShowInvite(false), 5000);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowInvite(true);
    setTimeout(() => setShowInvite(false), 3000);
  };

  const reactionEmojis = ['❤️', '🔥', '👎', '✨', '👗'];

  if (!isConnected) {
    return (
      <div className="absolute top-20 left-4 z-30">
        <button
          onClick={handleCreateRoom}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl flex items-center gap-2 border border-white/20 hover:scale-105 transition-transform"
        >
          <span>👯‍♀️</span> Squad Shop
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 플로팅 리액션 레이어 */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {reactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 100, x: Math.random() * 200 - 100 }}
              animate={{ opacity: 1, y: -200 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute bottom-1/4 left-1/2 text-4xl"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 컨트롤 패널 */}
      <div className="absolute top-20 left-4 z-20 flex flex-col gap-2">
        <div className="glass-card p-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md w-48">
           <div className="flex justify-between items-center mb-2">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
               <span className="text-xs font-bold text-white">Squad Live</span>
             </div>
             <button onClick={leaveRoom} className="text-[10px] text-red-400 hover:text-red-300">Exit</button>
           </div>

           <div className="flex items-center justify-between mb-3">
             <div className="flex -space-x-2">
               {participants.map((p) => (
                 <div key={p.id} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border border-black flex items-center justify-center text-[8px] text-white font-bold" title={p.name}>
                   {p.name.charAt(5)}
                 </div>
               ))}
               {participants.length === 0 && <div className="w-6 h-6 rounded-full bg-gray-600 border border-black" />}
             </div>
             <span className="text-[10px] text-gray-400">{participants.length} online</span>
           </div>

           <div className="flex gap-1 mb-3 justify-center">
             <button
                onClick={toggleVoice}
                className={`p-2 rounded-full transition-colors ${isVoiceActive ? 'bg-green-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
                {isVoiceActive ? '🎙️' : '🔇'}
             </button>
             <button onClick={handleCopyLink} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
                🔗
             </button>
           </div>

           {showInvite && (
             <motion.div
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[10px] text-cyber-lime text-center mb-2 bg-cyber-lime/10 rounded py-1"
             >
               Link copied! Share it.
             </motion.div>
           )}

           <div className="grid grid-cols-5 gap-1">
             {reactionEmojis.map(emoji => (
               <button
                 key={emoji}
                 onClick={() => sendReaction(emoji)}
                 className="hover:scale-125 transition-transform text-lg"
               >
                 {emoji}
               </button>
             ))}
           </div>
        </div>
      </div>
    </>
  );
}
