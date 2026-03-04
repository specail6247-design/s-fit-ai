import re

with open('__tests__/unit/lib/visionService.test.ts', 'r') as f:
    content = f.read()

content = content.replace("const mockProportions: PoseProportions = {\n      shoulderWidth: 0.5,\n      hipWidth: 0.4,\n      torsoHeight: 0.4,\n      legLength: 0.5,\n      overallRatio: 1.2,\n    };",
"const mockProportions: PoseProportions = {\n      shoulderWidth: 0.5,\n      hipWidth: 0.4,\n      torsoHeight: 0.4,\n      legLength: 0.5,\n      overallRatio: 1.2,\n      waistWidth: 0.35,\n      armLength: 0.45,\n      shoulderSlope: 0.1,\n    };")

with open('__tests__/unit/lib/visionService.test.ts', 'w') as f:
    f.write(content)
