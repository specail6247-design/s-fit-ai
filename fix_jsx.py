with open('components/LuxuryLiveFitting.tsx', 'r') as f:
    content = f.read()

content = content.replace('  return (\n    \n      {/* Custom Gold Ring Cursor */}', '  return (\n    <>\n      {/* Custom Gold Ring Cursor */}')

content = content.replace('      <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white/90  ${inter.className}`}>', '      <div className={`relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white/90  ${inter.className}`}>')

with open('components/LuxuryLiveFitting.tsx', 'w') as f:
    f.write(content.replace('    </div>\n  );\n}', '    </div>\n    </>\n  );\n}'))
