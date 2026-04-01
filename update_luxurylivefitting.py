import re

with open('components/LuxuryLiveFitting.tsx', 'r') as f:
    content = f.read()

# Replace imports
content = content.replace('import React from "react";', 'import React, { useState, useEffect } from "react";\nimport { motion, AnimatePresence } from "framer-motion";\nimport LuxuryImageDistortion from "./LuxuryImageDistortion";')
content = content.replace('Space_Grotesk', 'Cinzel, Inter')
content = content.replace('const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });', 'const cinzel = Cinzel({ subsets: ["latin"] });\nconst inter = Inter({ subsets: ["latin"] });')

# Replace component name
content = content.replace('export default function ARLiveFitting()', 'export default function LuxuryLiveFitting()')

# Apply Theme Overhaul: Yellow/Black -> Gold/Black/Serif
content = content.replace('bg-[#f6f7f8]', 'bg-[#0a0a0a]')
content = content.replace('dark:bg-[#101922]', '')
content = content.replace('text-white', 'text-white/90')
content = content.replace('text-[#2b8cee]', 'text-[#ecab13]')
content = content.replace('bg-[#2b8cee]', 'bg-[#ecab13]')
content = content.replace('border-[#2b8cee]', 'border-[#ecab13]/30')
content = content.replace('shadow-[0_0_15px_#2b8cee]', 'shadow-[0_0_15px_#ecab13]')
content = content.replace('rgba(16, 25, 34, 0.6)', 'rgba(10, 10, 10, 0.8)')
content = content.replace('bg-[#101922]/10', 'bg-[#0a0a0a]/50')
content = content.replace('text-[#101922]', 'text-[#ecab13]')
content = content.replace('${spaceGrotesk.className}', '${inter.className}')

# Custom Cursor
cursor_code = """
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById("luxury-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
"""
content = content.replace('export default function LuxuryLiveFitting() {\n', f'export default function LuxuryLiveFitting() {{\n{cursor_code}\n')

# Add custom cursor to JSX
cursor_jsx = """
      {/* Custom Gold Ring Cursor */}
      <div
        id="luxury-cursor"
        className="pointer-events-none fixed z-[100] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ecab13] mix-blend-difference transition-transform duration-75 ease-out"
      />
"""
content = content.replace('<div className={`relative flex h-screen', f'{cursor_jsx}\n      <div className={{`relative flex h-screen')

# Add Loading State
# We will use framer motion for a thin gold line tracing a box.
loading_jsx = """
      <AnimatePresence>
        {false && ( // Assuming a state controls this, set to false for now to see main content
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="h-32 w-24 border border-[#ecab13]/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
               <motion.div
                  className="h-full w-full border-t border-l border-[#ecab13]"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
"""

# Replace background image with LuxuryImageDistortion
main_viewport_regex = re.compile(r'<div\s+className="relative flex h-screen w-full flex-col"[^>]*>.*?<div', re.DOTALL)

with open('components/LuxuryLiveFitting.tsx', 'w') as f:
    f.write(content)
