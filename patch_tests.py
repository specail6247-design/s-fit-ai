import re

with open('__tests__/unit/lib/visionService.test.ts', 'r') as f:
    content = f.read()

# Fix mock PoseProportions
content = re.sub(
    r"const mockProportions: PoseProportions = \{\n\s*shoulderWidth: 0\.5,\n\s*hipWidth: 0\.4,\n\s*torsoHeight: 0\.4,\n\s*legLength: 0\.5,\n\s*overallRatio: 1\.2,\n\s*\};",
    "const mockProportions: PoseProportions = {\n      shoulderWidth: 0.5,\n      hipWidth: 0.4,\n      torsoHeight: 0.4,\n      legLength: 0.5,\n      overallRatio: 1.2,\n      waistWidth: 0.35,\n      armLength: 0.45,\n      shoulderSlope: 0.1\n    };",
    content
)

# Fix ClothingItem mock
content = re.sub(
    r"category: 'tops',",
    "category: 'tops' as const,",
    content
)

with open('__tests__/unit/lib/visionService.test.ts', 'w') as f:
    f.write(content)
