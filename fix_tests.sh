#!/bin/bash
sed -i 's/const mockProportions: PoseProportions = {/const mockProportions: PoseProportions = { waistWidth: 0.5, armLength: 0.5, shoulderSlope: 0.1, /g' __tests__/unit/lib/visionService.test.ts
sed -i 's/category: '"'"'tops'"'"' /category: '"'"'tops'"'"' as const /g' __tests__/unit/lib/visionService.test.ts
