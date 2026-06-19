#!/bin/bash
sed -i 's/<Mannequin height={height} opacity={1.0} \/>/<Mannequin height={height} \/>/g' components/FittingRoom.tsx
sed -i 's/overallRatio: 0.5/overallRatio: 0.5,\n      waistWidth: 0.5,\n      armLength: 0.5,\n      shoulderSlope: 0.5/g' __tests__/unit/lib/visionService.test.ts
sed -i "s/category: 'tops'/category: 'tops' as const/g" __tests__/unit/lib/visionService.test.ts
