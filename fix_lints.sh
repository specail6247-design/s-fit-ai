#!/bin/bash

# Fix components/LuxuryGarmentDetail.tsx
sed -i "s/Engineered with S_FIT AI's proprietary/Engineered with S_FIT AI\&apos;s proprietary/g" components/LuxuryGarmentDetail.tsx
sed -i "s/import { motion } from 'framer-motion';//g" components/LuxuryGarmentDetail.tsx

# Fix components/RealLifeFitting.tsx
sed -i 's/{userImage ? <img src={userImage} className="w-full h-full object-cover" \/> : <span className="text-2xl">👤<\/span>}/{userImage ? ( <>\n                    {\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n                    <img src={userImage} className="w-full h-full object-cover" alt="User Photo" \/>\n                  <\/>\n                ) : <span className="text-2xl">👤<\/span>}/g' components/RealLifeFitting.tsx
sed -i 's/{garmentImage ? <img src={garmentImage} className="w-full h-full object-cover" \/> : <span className="text-2xl">👕<\/span>}/{garmentImage ? ( <>\n                    {\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n                    <img src={garmentImage} className="w-full h-full object-cover" alt="Garment Image" \/>\n                  <\/>\n                ) : <span className="text-2xl">👕<\/span>}/g' components/RealLifeFitting.tsx
sed -i 's/<img src={resultImage} alt="Result" className="w-auto h-\[70vh\] rounded-xl object-contain shadow-2xl" \/>/{\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n              <img src={resultImage} alt="Result" className="w-auto h-[70vh] rounded-xl object-contain shadow-2xl" \/>/g' components/RealLifeFitting.tsx

# Fix components/PhotoFitting.tsx
sed -i 's/import React, { useState, useEffect } from "react";/import React, { useState } from "react";/g' components/PhotoFitting.tsx

# Fix components/FittingRoom.tsx
sed -i 's/height = 170, opacity = 1.0/height = 170/g' components/FittingRoom.tsx
sed -i 's/}: { height?: number; opacity?: number; bodyShape?: string; proportions?: PoseProportions | null }) {/}: { height?: number; bodyShape?: string; proportions?: PoseProportions | null }) {/g' components/FittingRoom.tsx

# Fix components/ErrorBoundary.tsx
sed -i 's/public static getDerivedStateFromError(_: Error): State {/public static getDerivedStateFromError(): State {/g' components/ErrorBoundary.tsx

# Fix app/spa/layout.tsx
sed -i 's/href="https:\/\/fonts.googleapis.com\/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/href="https:\/\/fonts.googleapis.com\/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200\&display=optional"/g' app/spa/layout.tsx

# Fix app/luxury/layout.tsx
sed -i 's/href="https:\/\/fonts.googleapis.com\/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/href="https:\/\/fonts.googleapis.com\/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200\&display=optional"/g' app/luxury/layout.tsx

# Fix components/SimpleTryOn.tsx
sed -i 's/{userImage && <img src={userImage} style={styles.preview} alt="User" \/>}/{userImage && ( <>\n                {\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n                <img src={userImage} style={styles.preview} alt="User" \/>\n              <\/>\n              )}/g' components/SimpleTryOn.tsx
sed -i 's/{clothingImage && <img src={clothingImage} style={styles.preview} alt="Cloth" \/>}/{clothingImage && ( <>\n                {\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n                <img src={clothingImage} style={styles.preview} alt="Cloth" \/>\n              <\/>\n              )}/g' components/SimpleTryOn.tsx
sed -i 's/<img src={finalResult} style={styles.finalImg} alt="Result" \/>/{\/* eslint-disable-next-line @next\/next\/no-img-element *\/}\n            <img src={finalResult} style={styles.finalImg} alt="Result" \/>/g' components/SimpleTryOn.tsx
