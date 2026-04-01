with open('components/LuxuryLiveFitting.tsx', 'r') as f:
    content = f.read()

loading_jsx = """
      <AnimatePresence>
        {isLoading && (
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

content = content.replace('      {/* Main AR Viewport Container */}', loading_jsx + '\n      {/* Main AR Viewport Container */}')

with open('components/LuxuryLiveFitting.tsx', 'w') as f:
    f.write(content)
