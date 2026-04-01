import re

with open('components/LuxuryLiveFitting.tsx', 'r') as f:
    content = f.read()

# Fix fonts import
content = content.replace('import { Space_Grotesk } from "next/font/google";', 'import { Cinzel, Inter } from "next/font/google";')

# Replace the backgroundImage div with LuxuryImageDistortion
old_div = """      <div
        className="relative flex h-screen w-full flex-col"
        data-alt="User reflection with AR garment overlay"
        style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}
      >"""

new_div = """      <div className="relative flex h-screen w-full flex-col">
        <div className="absolute inset-0 z-0">
          <LuxuryImageDistortion
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="User reflection with AR garment overlay"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />"""

content = content.replace(old_div, new_div)

# Change loading state to true for testing temporarily
content = content.replace('{false && ( // Assuming a state controls this, set to false for now to see main content', '{isLoading && (')

# Add state for loading
content = content.replace('export default function LuxuryLiveFitting() {', 'export default function LuxuryLiveFitting() {\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    const timer = setTimeout(() => setIsLoading(false), 2000);\n    return () => clearTimeout(timer);\n  }, []);\n')

# Use Cinzel for headers
content = content.replace('className="text-sm font-bold tracking-widest uppercase text-white/90"', 'className={`text-sm font-bold tracking-widest uppercase text-white/90 ${cinzel.className}`}')
content = content.replace('className="truncate text-[10px] font-bold uppercase text-white/90"', 'className={`truncate text-[10px] font-bold uppercase text-white/90 ${cinzel.className}`}')

with open('components/LuxuryLiveFitting.tsx', 'w') as f:
    f.write(content)
