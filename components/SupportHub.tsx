'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const carouselSteps = [
  {
    title: "1. UPLOAD PHOTO",
    desc: "Take a clear, full-body shot against a plain background.",
  },
  {
    title: "2. SELECT GARMENT",
    desc: "Choose a product to try on from our catalog.",
  },
  {
    title: "3. AI FITTING",
    desc: "Our AI maps the garment seamlessly to your body.",
  }
];

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % carouselSteps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + carouselSteps.length) % carouselSteps.length);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition-all border border-white/10"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined">help</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring' as const, bounce: 0, duration: 0.4 }}
              className="w-full max-w-md bg-void-black border-l border-white/10 h-full overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-mono tracking-widest uppercase">SUPPORT HUB</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-soft-gray hover:text-white transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-12">
              {/* How to Fit Carousel */}
              <section>
                <h3 className="text-sm font-mono text-soft-gray tracking-widest mb-4 uppercase">HOW TO FIT</h3>
                <div className="bg-white/5 border border-white/10 p-6 relative">
                  <div className="text-center min-h-[120px] flex flex-col justify-center">
                    <h4 className="font-mono tracking-wide mb-2">{carouselSteps[currentStep].title}</h4>
                    <p className="text-sm text-soft-gray">{carouselSteps[currentStep].desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <button onClick={prevStep} className="text-soft-gray hover:text-white" aria-label="Previous Step">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="flex gap-2">
                      {carouselSteps.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-white' : 'bg-white/30'}`} />
                      ))}
                    </div>
                    <button onClick={nextStep} className="text-soft-gray hover:text-white" aria-label="Next Step">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Caution Section */}
              <section>
                <h3 className="text-sm font-mono text-soft-gray tracking-widest mb-4 uppercase">CAUTION</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start bg-white/5 p-4 border border-white/10">
                    <span className="material-symbols-outlined text-[#ecab13]">lightbulb</span>
                    <div>
                      <h4 className="font-mono text-sm mb-1">LIGHTING</h4>
                      <p className="text-xs text-soft-gray">Ensure even lighting. Avoid strong backlights or deep shadows for accurate mapping.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white/5 p-4 border border-white/10">
                    <span className="material-symbols-outlined text-[#ecab13]">photo_camera</span>
                    <div>
                      <h4 className="font-mono text-sm mb-1">DISTANCE</h4>
                      <p className="text-xs text-soft-gray">Stand 3-5 feet from the camera. The full body from head to toe must be visible.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white/5 p-4 border border-white/10">
                    <span className="material-symbols-outlined text-[#ecab13]">warning</span>
                    <div>
                      <h4 className="font-mono text-sm mb-1">CLOTHING</h4>
                      <p className="text-xs text-soft-gray">Wear form-fitting clothes. Baggy clothes will reduce the accuracy of the 3D fit.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h3 className="text-sm font-mono text-soft-gray tracking-widest mb-4 uppercase">Q&A</h3>
                <div className="space-y-2">
                  <details className="group bg-white/5 border border-white/10 p-4 open:bg-white/10 transition-colors">
                    <summary className="font-mono text-sm cursor-pointer list-none flex justify-between items-center">
                      What is AI Fitting?
                      <span className="material-symbols-outlined text-soft-gray group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="mt-4 text-xs text-soft-gray leading-relaxed">
                      AI Fitting uses advanced computer vision to analyze your body shape and map 3D garments onto your photo, providing a highly accurate virtual try-on experience.
                    </p>
                  </details>
                  <details className="group bg-white/5 border border-white/10 p-4 open:bg-white/10 transition-colors">
                    <summary className="font-mono text-sm cursor-pointer list-none flex justify-between items-center">
                      Is my data safe?
                      <span className="material-symbols-outlined text-soft-gray group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="mt-4 text-xs text-soft-gray leading-relaxed">
                      Yes. Your photos are processed securely and are never shared or used to train public models without your explicit consent.
                    </p>
                  </details>
                  <details className="group bg-white/5 border border-white/10 p-4 open:bg-white/10 transition-colors">
                    <summary className="font-mono text-sm cursor-pointer list-none flex justify-between items-center">
                      How long does it take?
                      <span className="material-symbols-outlined text-soft-gray group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="mt-4 text-xs text-soft-gray leading-relaxed">
                      Our real-time engine typically processes a high-fidelity fit within 5-10 seconds, depending on your internet connection.
                    </p>
                  </details>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </>
  );
}
