import re

# Fix AmbientAudio
with open('components/AmbientAudio.tsx', 'r') as f:
    content = f.read()
content = content.replace("  const [isPlaying, setIsPlaying] = useState(false);\n", "")
content = content.replace(", useState", "")
content = content.replace("          setIsPlaying(true);\n", "")
content = content.replace("          setIsPlaying(false);\n", "")
content = content.replace("        setIsPlaying(false);\n", "")
content = content.replace(".then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));", ".catch(() => {});")
content = content.replace("catch (error)", "catch (_error)")
with open('components/AmbientAudio.tsx', 'w') as f:
    f.write(content)

# Fix LuxuryGarmentDetail
with open('components/LuxuryGarmentDetail.tsx', 'r') as f:
    content = f.read()
content = content.replace("import { motion, AnimatePresence } from 'framer-motion';\n", "")
content = content.replace("saveLook(item as any);", "saveLook(item as import('@/data/mockData').ClothingItem);")
content = content.replace("Engineered with S_FIT AI's proprietary", "Engineered with S_FIT AI&apos;s proprietary")
with open('components/LuxuryGarmentDetail.tsx', 'w') as f:
    f.write(content)
