const fs = require('fs');
let code = fs.readFileSync('__tests__/unit/lib/visionService.test.ts', 'utf-8');

code = code.replace(
  `    const mockProportions: PoseProportions = {
      shoulderWidth: 0.5,
      hipWidth: 0.5,
      torsoHeight: 0.5,
      legLength: 0.5,
      overallRatio: 0.5
    };`,
  `    const mockProportions: PoseProportions = {
      shoulderWidth: 0.5,
      hipWidth: 0.5,
      torsoHeight: 0.5,
      legLength: 0.5,
      overallRatio: 0.5,
      waistWidth: 0.4,
      armLength: 0.4,
      shoulderSlope: 0.1
    };`
);

code = code.replace(
  `        const blackItem = { ...getAllItems()[0], colors: ['Black'], category: 'tops' };`,
  `        const blackItem: any = { ...getAllItems()[0], colors: ['Black'], category: 'tops' };`
);

fs.writeFileSync('__tests__/unit/lib/visionService.test.ts', code);
