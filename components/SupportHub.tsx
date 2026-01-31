'use client';

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { motion, AnimatePresence } from 'framer-motion';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportHub({ isOpen, onClose }: SupportHubProps) {
  const [activeSection, setActiveSection] = useState<'guide' | 'faq' | 'report'>('guide');
  const [reportForm, setReportForm] = useState({ subject: '', description: '', severity: 'low' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        console.log('Report submitted:', reportForm);
        alert('Thank you for your feedback! We will look into it.');
        setIsSubmitting(false);
        setReportForm({ subject: '', description: '', severity: 'low' });
        onClose();
    }, 1000);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Support Hub">
      <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
        {['guide', 'faq', 'report'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section as 'guide' | 'faq' | 'report')}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              activeSection === section
              ? 'bg-[#007AFF] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {section === 'guide' ? 'Guide' : section === 'faq' ? 'FAQs' : 'Report'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-xl p-4">
                <h4 className="font-bold text-white mb-2">🚀 Getting Started</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                    1. Choose a mode (Easy Fit, Vibe Check, or Digital Twin).<br/>
                    2. Upload your photo or use our models.<br/>
                    3. Try on luxury items and see the magic happen!
                </p>
            </div>

            <div className="border border-white/10 rounded-xl p-4 bg-white/5">
                <h4 className="font-bold text-white mb-2">💡 Pro Tips</h4>
                <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                    <li>Use a well-lit photo with a neutral background.</li>
                    <li>For best results, wear tight-fitting clothes in your photo.</li>
                    <li>Try &quot;Macro View&quot; to see fabric details.</li>
                </ul>
            </div>
          </motion.div>
        )}

        {activeSection === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-2"
          >
            {[
                { q: "Is my photo safe?", a: "Yes! We process photos securely on ephemeral servers and delete them after your session." },
                { q: "How accurate is the sizing?", a: "Our AI analyzes over 50 body landmarks to recommend the best size with 95% accuracy." },
                { q: "Can I buy the items?", a: "Not yet. This is a virtual fitting experience demo." },
                { q: "Why is it slow?", a: "High-quality 3D and AI rendering takes significant computing power. We are optimizing it!" }
            ].map((faq, i) => (
                <div key={i} className="border border-white/10 rounded-lg p-3 bg-white/5">
                    <p className="text-xs font-bold text-white mb-1">Q: {faq.q}</p>
                    <p className="text-xs text-gray-400">A: {faq.a}</p>
                </div>
            ))}
          </motion.div>
        )}

        {activeSection === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Issue Subject</label>
                    <input
                        required
                        value={reportForm.subject}
                        onChange={(e) => setReportForm({...reportForm, subject: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors"
                        placeholder="e.g., 3D Model Glitch"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                    <textarea
                        required
                        value={reportForm.description}
                        onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none h-32 resize-none transition-colors"
                        placeholder="Describe what happened..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-1">Severity</label>
                    <select
                        value={reportForm.severity}
                        onChange={(e) => setReportForm({...reportForm, severity: e.target.value})}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 text-sm text-white focus:border-[#007AFF] outline-none transition-colors"
                    >
                        <option value="low">Low - Visual Glitch</option>
                        <option value="medium">Medium - Feature Broken</option>
                        <option value="high">High - App Crash</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <span className="animate-pulse">Sending...</span> : 'Submit Report'}
                </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer>
  );
}
