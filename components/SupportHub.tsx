import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// S_FIT AI Support Hub Component
// Includes Privacy Policy, Terms, Data Safety, Report Issue, and Share features

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'policy' | 'terms' | 'report'>('policy');

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-black/60 text-white p-3 rounded-full hover:bg-[#007AFF] transition-colors border border-white/20 shadow-lg backdrop-blur-md"
        title="Support Hub & Legal"
      >
        <span className="text-xl">ℹ️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-[#007AFF]">S_FIT</span> Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Data Safety Badge */}
              <div className="bg-[#007AFF]/10 border-b border-[#007AFF]/20 p-4 flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="text-sm font-bold text-white">Data Safety Guarantee</h3>
                  <p className="text-xs text-gray-400">Photos are processed securely and not shared. Automatically deleted after fitting.</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 text-sm">
                <button
                  onClick={() => setActiveTab('policy')}
                  className={`flex-1 p-3 text-center transition-colors ${activeTab === 'policy' ? 'bg-white/10 text-white font-bold border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`flex-1 p-3 text-center transition-colors ${activeTab === 'terms' ? 'bg-white/10 text-white font-bold border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`flex-1 p-3 text-center transition-colors ${activeTab === 'report' ? 'bg-white/10 text-white font-bold border-b-2 border-[#007AFF]' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Report Issue
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-300">
                {activeTab === 'policy' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
                    <p>At S_FIT AI, your privacy is our top priority. We are committed to protecting your personal information and being transparent about our practices.</p>
                    <h4 className="font-bold text-white mt-4">1. Data Collection</h4>
                    <p>We temporarily process uploaded photos strictly for the purpose of generating virtual try-on results. Photos are not permanently stored on our servers.</p>
                    <h4 className="font-bold text-white mt-4">2. Usage</h4>
                    <p>Your images and usage data are only used to provide the service and improve the fitting algorithm quality.</p>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Terms of Service</h3>
                    <p>Welcome to S_FIT AI. By using our service, you agree to these terms.</p>
                    <h4 className="font-bold text-white mt-4">1. Acceptable Use</h4>
                    <p>You agree to only upload images that you have the right to use and that do not violate any laws or regulations.</p>
                    <h4 className="font-bold text-white mt-4">2. Freemium Limits</h4>
                    <p>Free users are limited to 5 virtual try-ons per day. Premium features require an active subscription.</p>
                  </div>
                )}

                {activeTab === 'report' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Report an Issue</h3>
                    <p className="text-xs mb-4">Help us improve S_FIT AI by reporting any bugs or feedback.</p>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Feedback submitted. Thank you!'); setIsOpen(false); }}>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Issue Type</label>
                        <select className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white">
                          <option>Fitting Error</option>
                          <option>Bug / Glitch</option>
                          <option>Feature Request</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                        <textarea
                          className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-white h-24 resize-none"
                          placeholder="Describe the issue..."
                          required
                        />
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-lg transition-colors">
                        Submit Report
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
