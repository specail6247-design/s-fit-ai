'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'privacy' | 'terms' | 'report'>('menu');

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-[#007AFF] hover:shadow-[0_0_15px_rgba(0,122,255,0.3)] backdrop-blur-md transition-all"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  {activeTab !== 'menu' && (
                    <button onClick={() => setActiveTab('menu')} className="text-white/50 hover:text-white transition-colors">
                      ←
                    </button>
                  )}
                  <h2 className="text-sm font-bold tracking-widest text-white uppercase">
                    {activeTab === 'menu' ? 'Support & Legal' :
                     activeTab === 'privacy' ? 'Privacy Policy' :
                     activeTab === 'terms' ? 'Terms of Service' :
                     'Report Issue'}
                  </h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors text-lg">
                  ✕
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300">
                {activeTab === 'menu' && (
                  <div className="space-y-3">
                    <button onClick={() => setActiveTab('privacy')} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors text-left group">
                      <span className="font-medium text-white group-hover:text-[#007AFF] transition-colors">Privacy Policy</span>
                      <span className="text-white/30">→</span>
                    </button>
                    <button onClick={() => setActiveTab('terms')} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors text-left group">
                      <span className="font-medium text-white group-hover:text-[#007AFF] transition-colors">Terms of Service</span>
                      <span className="text-white/30">→</span>
                    </button>
                    <button onClick={() => setActiveTab('report')} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between hover:bg-[#007AFF]/10 border hover:border-[#007AFF]/50 transition-all text-left group">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">🐛</span>
                        <span className="font-medium text-white group-hover:text-[#007AFF] transition-colors">Report Issue</span>
                      </div>
                      <span className="text-white/30">→</span>
                    </button>

                    <div className="mt-8 p-4 bg-[#007AFF]/10 border border-[#007AFF]/30 rounded-xl flex items-start gap-3">
                      <div className="mt-0.5 text-[#007AFF] text-lg">🛡️</div>
                      <div>
                        <h4 className="text-xs font-bold text-[#007AFF] uppercase mb-1">Data Safety</h4>
                        <p className="text-xs text-blue-200/70 leading-relaxed">
                          Photos are processed securely and not shared. All uploaded images are deleted immediately after the virtual fitting process is complete.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-4 text-xs leading-relaxed">
                    <p><strong>1. Data Collection:</strong> We temporarily collect images you upload for the sole purpose of providing the virtual fitting service.</p>
                    <p><strong>2. Data Usage:</strong> Your images are sent to our AI processing partners (e.g., Replicate) securely and are used exclusively to generate the fitting result.</p>
                    <p><strong>3. Data Retention:</strong> We do not store your photos. They are automatically deleted from our servers and our partners&apos; servers immediately after processing.</p>
                    <p><strong>4. Third-Party Sharing:</strong> We do not sell or share your personal data or photos with third parties for marketing purposes.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4 text-xs leading-relaxed">
                    <p><strong>1. Acceptance of Terms:</strong> By using S_FIT AI, you agree to these terms and conditions.</p>
                    <p><strong>2. User Content:</strong> You represent that you have the right to upload the images you provide. Do not upload inappropriate, offensive, or copyrighted material without permission.</p>
                    <p><strong>3. Service Limitations:</strong> The virtual fitting results are AI-generated approximations and may not perfectly reflect real-life fit or fabric behavior.</p>
                    <p><strong>4. Liability:</strong> S_FIT AI is provided &quot;as is&quot;. We are not liable for any damages arising from the use of the service or reliance on the generated images.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Issue reported! Thank you.'); setActiveTab('menu'); }}>
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Issue Type</label>
                      <select className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#007AFF]">
                        <option>Bug / Glitch</option>
                        <option>Fitting Quality Issue</option>
                        <option>Feature Request</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/70 uppercase mb-2">Description</label>
                      <textarea
                        rows={4}
                        className="w-full bg-black/50 border border-white/20 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#007AFF] resize-none"
                        placeholder="Please describe the issue in detail..."
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors">
                      Submit Report
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
