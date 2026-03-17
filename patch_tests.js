const fs = require('fs');
let content = fs.readFileSync('__tests__/unit/lib/visionService.test.ts', 'utf8');

// Fix Proportions
content = content.replace(
  'overallRatio: 0.5\n    };',
  'overallRatio: 0.5,\n      waistWidth: 0.4,\n      armLength: 0.6,\n      shoulderSlope: 0.1\n    };'
);

// Fix Category Type
// Let's find the second error around line 110
content = content.replace(/category: 'tops',/g, "category: 'tops' as const,");

fs.writeFileSync('__tests__/unit/lib/visionService.test.ts', content);
console.log("Patched test file.");
