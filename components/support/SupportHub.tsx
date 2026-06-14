"use client";

import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';

interface SupportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = 'main' | 'report' | 'privacy' | 'terms' | 'guide' | 'faq';

export const SupportHub: React.FC<SupportHubProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<ViewState>('main');
  const [issueText, setIssueText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleClose = () => {
    setView('main');
    onClose();
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIssueText('');
      setView('main');
      alert('Issue reported successfully. Thank you!');
    }, 1000);
  };

  const faqs = [
    { q: "How long does virtual fitting take?", a: "Typically, fitting takes between 10 to 30 seconds depending on server load and image complexity." },
    { q: "What kind of photos work best?", a: "Clear, front-facing photos with good lighting work best. Avoid baggy clothing in the original photo for more accurate results." },
    { q: "Is my data safe?", a: "Yes. Your photos are processed securely for the fitting generation and are not shared or stored permanently." }
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose} title={view === 'main' ? 'Support Hub' : 'Back to Hub'}>
      <div className="text-white h-full max-h-[70vh] overflow-y-auto w-full max-w-md mx-auto">
        {view !== 'main' && (
          <button
            onClick={() => setView('main')}
            className="mb-4 text-[#007AFF] text-sm font-bold flex items-center gap-1"
          >
            ← Back
          </button>
        )}

        {view === 'main' && (
          <div className="space-y-4">
            <button onClick={() => setView('report')} className="w-full text-left p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition border border-white/10 flex justify-between items-center">
              <div>
                <div className="font-bold">Report Issue</div>
                <div className="text-xs text-gray-400">Found a bug? Let us know.</div>
              </div>
              <span>🐛</span>
            </button>
            <button onClick={() => setView('guide')} className="w-full text-left p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition border border-white/10 flex justify-between items-center">
              <div>
                <div className="font-bold">User Guide</div>
                <div className="text-xs text-gray-400">Tips for the best results.</div>
              </div>
              <span>📖</span>
            </button>
            <button onClick={() => setView('faq')} className="w-full text-left p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition border border-white/10 flex justify-between items-center">
              <div>
                <div className="font-bold">FAQ</div>
                <div className="text-xs text-gray-400">Common questions.</div>
              </div>
              <span>❓</span>
            </button>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button onClick={() => setView('privacy')} className="p-3 text-center bg-gray-900 rounded-xl hover:bg-gray-800 transition border border-white/10 text-xs font-bold text-gray-300">
                Privacy Policy
              </button>
              <button onClick={() => setView('terms')} className="p-3 text-center bg-gray-900 rounded-xl hover:bg-gray-800 transition border border-white/10 text-xs font-bold text-gray-300">
                Terms of Service
              </button>
            </div>
          </div>
        )}

        {view === 'report' && (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Report Issue</h3>
            <p className="text-sm text-gray-400 mb-4">Describe the problem you encountered in detail.</p>
            <textarea
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder="What went wrong?"
              className="w-full h-32 p-3 bg-black border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#007AFF] resize-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !issueText.trim()}
              className="w-full py-3 bg-[#007AFF] hover:bg-[#005bb5] disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}

        {view === 'guide' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">User Guide</h3>
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-[#007AFF] text-sm mb-1">Step 1: Lighting is Key</h4>
                <p className="text-xs text-gray-300">Ensure you are well-lit from the front. Avoid harsh shadows across your body.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-[#007AFF] text-sm mb-1">Step 2: Pose Naturally</h4>
                <p className="text-xs text-gray-300">Stand straight facing the camera with your arms slightly away from your body.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-[#007AFF] text-sm mb-1">Step 3: Upload Clear Garments</h4>
                <p className="text-xs text-gray-300">Use high-quality, flat-lay or front-facing model images for the target clothing.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'faq' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-900 rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-4 font-bold flex justify-between items-center"
                  >
                    <span className="text-sm">{faq.q}</span>
                    <span className="text-gray-500">{expandedFaq === idx ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Privacy Policy</h3>
            <div className="text-xs text-gray-300 space-y-3 p-4 bg-gray-900 rounded-xl border border-white/10">
              <p><strong>1. Data Collection:</strong> We collect uploaded photos temporarily to process the virtual fitting.</p>
              <p><strong>2. Data Usage:</strong> Photos are strictly used for the IDM-VTON AI generation process.</p>
              <p><strong>3. Data Security:</strong> Photos are processed securely and are NOT shared with third parties or used for AI training.</p>
              <p><strong>4. Retention:</strong> Processed images are temporarily stored to deliver results and are periodically purged.</p>
            </div>
          </div>
        )}

        {view === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Terms of Service</h3>
            <div className="text-xs text-gray-300 space-y-3 p-4 bg-gray-900 rounded-xl border border-white/10">
              <p><strong>1. Acceptance:</strong> By using S_FIT AI, you agree to these terms.</p>
              <p><strong>2. Acceptable Use:</strong> Do not upload inappropriate, explicit, or copyrighted materials without permission.</p>
              <p><strong>3. Service Availability:</strong> The fitting service is provided &quot;as is&quot; and may experience downtime due to API limits or server load.</p>
              <p><strong>4. Limitation of Liability:</strong> We are not responsible for any inaccuracies in the fitting results or sizing recommendations.</p>
            </div>
          </div>
        )}

      </div>
    </BottomSheet>
  );
};
