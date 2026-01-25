'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SneakerDropLanding() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* Stylized Background */}
       <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black z-0" />
       <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-cyber-lime/10 rounded-full blur-[100px]" />

       <div className="z-10 max-w-md w-full text-center space-y-12">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
             <h1 className="text-6xl font-black italic tracking-tighter mb-2">
               DROP <span className="text-cyber-lime">ZONE</span>
             </h1>
             <p className="text-sm font-mono text-gray-400 tracking-[0.3em] uppercase">
               Augmented Reality Footwear
             </p>
          </motion.div>

          <div className="relative w-64 h-64 mx-auto bg-gray-900/50 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(204,255,0,0.1)]">
             <span className="text-6xl animate-bounce">👟</span>
             {/* We could put a 3D spinning shoe here later */}
          </div>

          <div className="space-y-4">
             <h2 className="text-2xl font-bold">The Future of Kicks</h2>
             <p className="text-gray-400 text-sm">
               Experience the most hyped sneakers on your own feet using WebXR. No app required.
             </p>
          </div>

          <div className="space-y-4">
             <Link href="/sneaker-drop/fitting" className="block w-full py-4 bg-cyber-lime text-black font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                ENTER AR MODE
             </Link>
             <Link href="/" className="block text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">
                Return Home
             </Link>
          </div>
       </div>
    </div>
  )
}
