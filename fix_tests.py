import re

with open('__tests__/unit/lib/visionService.test.ts', 'r') as f:
    content = f.read()

# Fix PoseProportions missing properties
content = content.replace('      shoulderWidth: 0.5,\n      hipWidth: 0.4,\n      torsoHeight: 0.8,\n      legLength: 1.0,\n      overallRatio: 1.2,', '      shoulderWidth: 0.5,\n      hipWidth: 0.4,\n      torsoHeight: 0.8,\n      legLength: 1.0,\n      overallRatio: 1.2,\n      waistWidth: 0.35,\n      armLength: 0.6,\n      shoulderSlope: 0.1,')

# Fix Category property
content = content.replace('category: "tops"', 'category: "tops" as const')

with open('__tests__/unit/lib/visionService.test.ts', 'w') as f:
    f.write(content)
