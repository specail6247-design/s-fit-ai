"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LegalModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#050505] border border-white/20 w-full max-w-2xl max-h-[80vh] flex flex-col z-[90] shadow-2xl overflow-hidden rounded-xl"
            >
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`flex-1 py-4 text-xs font-serif uppercase tracking-widest ${activeTab === 'privacy' ? 'text-[#C9B037] border-b-2 border-[#C9B037]' : 'text-white/50 hover:text-white'}`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`flex-1 py-4 text-xs font-serif uppercase tracking-widest ${activeTab === 'terms' ? 'text-[#C9B037] border-b-2 border-[#C9B037]' : 'text-white/50 hover:text-white'}`}
                >
                  Terms of Service
                </button>
                <button onClick={onClose} className="px-6 text-white/50 hover:text-white">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 text-sm text-white/80 space-y-6">
                {activeTab === 'privacy' ? (
                  <>
                    <h2 className="text-xl font-serif text-[#C9B037] mb-4">Privacy Policy</h2>
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded border border-[#C9B037]/30 mb-6">
                      <span className="text-2xl text-[#C9B037]">🔒</span>
                      <div>
                        <h4 className="text-[#C9B037] font-bold">Data Safety Guarantee</h4>
                        <p className="text-xs text-white/70">Photos are processed securely for try-on purposes only and are never shared with third parties.</p>
                      </div>
                    </div>
                    <p>At S_FIT AI, your privacy is our priority. This policy outlines how we handle your data.</p>
                    <h3 className="font-bold text-white mt-4">1. Information We Collect</h3>
                    <p>We temporarily process images you upload solely for the purpose of generating virtual try-on results. These images are not stored permanently on our servers.</p>
                    <h3 className="font-bold text-white mt-4">2. How We Use Your Information</h3>
                    <p>Your data is used exclusively to provide the core service: fitting analysis and rendering.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-serif text-[#C9B037] mb-4">Terms of Service</h2>
                    <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
                    <h3 className="font-bold text-white mt-4">1. Service Description</h3>
                    <p>S_FIT AI provides virtual fitting visualization. Results are AI-generated approximations.</p>
                    <h3 className="font-bold text-white mt-4">2. Acceptable Use</h3>
                    <p>You agree to only upload images you have the right to use and to not use the service for generating inappropriate content.</p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
