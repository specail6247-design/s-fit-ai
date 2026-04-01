with open('components/LuxuryLiveFitting.tsx', 'r') as f:
    content = f.read()

content = content.replace('const spaceGrotesk = Cinzel, Inter({ subsets: ["latin"] });', 'const cinzel = Cinzel({ subsets: ["latin"] });\nconst inter = Inter({ subsets: ["latin"] });')

with open('components/LuxuryLiveFitting.tsx', 'w') as f:
    f.write(content)
