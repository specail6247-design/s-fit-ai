import re

with open('__tests__/unit/lib/visionService.test.ts', 'r') as f:
    content = f.read()

# Fix PoseProportions missing properties
content = content.replace('      shoulderWidth: 0.5,\n      hipWidth: 0.5,\n      torsoHeight: 0.5,\n      legLength: 0.5,\n      overallRatio: 0.5', '      shoulderWidth: 0.5,\n      hipWidth: 0.5,\n      torsoHeight: 0.5,\n      legLength: 0.5,\n      overallRatio: 0.5,\n      waistWidth: 0.4,\n      armLength: 0.4,\n      shoulderSlope: 0.2')

# Fix Category property
content = content.replace("category: 'tops' };", "category: 'tops' as const };")

with open('__tests__/unit/lib/visionService.test.ts', 'w') as f:
    f.write(content)
