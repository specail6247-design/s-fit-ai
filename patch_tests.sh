sed -i 's/overallRatio: 0.5/overallRatio: 0.5,\n      waistWidth: 0.4,\n      armLength: 0.4,\n      shoulderSlope: 0.1/g' __tests__/unit/lib/visionService.test.ts

sed -i "s/category: 'tops'/category: 'tops' as const/g" __tests__/unit/lib/visionService.test.ts
