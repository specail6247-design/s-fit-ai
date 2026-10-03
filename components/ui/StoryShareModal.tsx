import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

export function StoryShareModal({ isOpen, onClose, imageUrl }: StoryShareModalProps) {
    if (!isOpen) return null;

    const handleShareToStory = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'S_FIT AI Try-On',
                    text: 'Check out my virtual fit on S_FIT AI! 👗✨ #SFITAI',
                    url: 'https://s-fit.ai'
                });
                onClose();
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            alert("Share API not supported on this browser. In a real app, this would download the image or open the Instagram app.");
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="relative w-full max-w-sm flex flex-col items-center">
                    <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 text-white/50 hover:text-white bg-black/50 rounded-full p-2"
                    >
                        ✕
                    </button>

                    <h3 className="text-white font-bold text-lg mb-4 text-center">Share to Story</h3>

                    <div className="relative w-[280px] h-[500px] bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border-[4px] border-gray-800 mb-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt="Result" className="w-full h-full object-cover opacity-90" />

                        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>

                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                                    <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold">
                                        YOU
                                    </div>
                                </div>
                             </div>
                        </div>

                        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl mb-2">
                                <span className="text-white font-bold text-sm tracking-widest italic">S_FIT AI</span>
                            </div>
                            <p className="text-white/80 text-xs font-mono">Virtual Try-On Result</p>
                        </div>
                    </div>

                    <button
                        onClick={handleShareToStory}
                        className="w-[280px] py-4 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-bold shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <span>📸</span> Share to IG Story
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}