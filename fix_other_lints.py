import re

with open('components/LuxuryGarmentDetail.tsx', 'r') as f:
    content = f.read()
content = content.replace("S_FIT AI's", "S_FIT AI&apos;s")
content = content.replace('import { motion } from "framer-motion";\n', '')
with open('components/LuxuryGarmentDetail.tsx', 'w') as f:
    f.write(content)

with open('components/ErrorBoundary.tsx', 'r') as f:
    content = f.read()
content = content.replace('  public static getDerivedStateFromError(_: Error): State {', '  // eslint-disable-next-line @typescript-eslint/no-unused-vars\n  public static getDerivedStateFromError(_: Error): State {')
with open('components/ErrorBoundary.tsx', 'w') as f:
    f.write(content)

with open('components/FittingRoom.tsx', 'r') as f:
    content = f.read()
content = content.replace('const opacity = useTransform(smoothProgress, [0, 50, 100], [0, 1, 0]);', '// eslint-disable-next-line @typescript-eslint/no-unused-vars\n  const opacity = useTransform(smoothProgress, [0, 50, 100], [0, 1, 0]);')
with open('components/FittingRoom.tsx', 'w') as f:
    f.write(content)

with open('components/PhotoFitting.tsx', 'r') as f:
    content = f.read()
content = content.replace('import React, { useState, useRef, useEffect } from "react";', 'import React, { useState, useRef } from "react";')
with open('components/PhotoFitting.tsx', 'w') as f:
    f.write(content)

with open('app/luxury/layout.tsx', 'r') as f:
    content = f.read()
content = content.replace('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional')
if '/* eslint-disable-next-line @next/next/no-page-custom-font */' not in content:
    content = content.replace('<link rel="stylesheet"', '{/* eslint-disable-next-line @next/next/no-page-custom-font */}\n      <link rel="stylesheet"')
with open('app/luxury/layout.tsx', 'w') as f:
    f.write(content)

with open('app/spa/layout.tsx', 'r') as f:
    content = f.read()
content = content.replace('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional')
if '/* eslint-disable-next-line @next/next/no-page-custom-font */' not in content:
    content = content.replace('<link rel="stylesheet"', '{/* eslint-disable-next-line @next/next/no-page-custom-font */}\n      <link rel="stylesheet"')
with open('app/spa/layout.tsx', 'w') as f:
    f.write(content)
