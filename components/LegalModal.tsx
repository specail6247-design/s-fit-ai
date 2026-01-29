'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, initialTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Legal & Compliance
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'privacy' ? 'text-cyber-lime bg-white/5' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Privacy Policy
              {activeTab === 'privacy' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-lime" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                activeTab === 'terms' ? 'text-cyber-lime bg-white/5' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Terms of Service
              {activeTab === 'terms' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-lime" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 text-gray-300 text-sm leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {activeTab === 'privacy' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                <p className="text-xs text-gray-500 uppercase">Last Updated: October 26, 2023</p>

                <section>
                  <h4 className="font-bold text-white mb-2">1. Introduction</h4>
                  <p>Welcome to S_FIT AI. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">2. Data We Collect</h4>
                  <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                    <li><strong>Image Data:</strong> includes photos you upload for virtual try-on. These are processed securely and are deleted after processing or per your settings.</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">3. How We Use Your Data</h4>
                  <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                    <li>To provide the virtual try-on service.</li>
                    <li>To improve our AI models (only with your explicit consent).</li>
                    <li>To manage our relationship with you.</li>
                  </ul>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">4. Data Security</h4>
                  <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                </section>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                <p className="text-xs text-gray-500 uppercase">Last Updated: October 26, 2023</p>

                <section>
                  <h4 className="font-bold text-white mb-2">1. Agreement to Terms</h4>
                  <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">2. Use License</h4>
                  <p>Permission is granted to temporarily download one copy of the materials (information or software) on S_FIT AI&apos;s website for personal, non-commercial transitory viewing only.</p>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">3. User Content</h4>
                  <p>Our Service allows you to upload, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
                </section>

                <section>
                  <h4 className="font-bold text-white mb-2">4. Disclaimer</h4>
                  <p>The materials on S_FIT AI&apos;s website are provided on an &apos;as is&apos; basis. S_FIT AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </section>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/40 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors uppercase text-xs tracking-widest"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
