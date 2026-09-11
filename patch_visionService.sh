sed -i 's/overallRatio: 0.5/overallRatio: 0.5,\n      waistWidth: 0.5,\n      armLength: 0.5,\n      shoulderSlope: 0.5/g' __tests__/unit/lib/visionService.test.ts
sed -i 's/colors: \['\''Black'\''\], category: '\''tops'\''/colors: ['\''Black'\''], category: '\''tops'\'' as const/g' __tests__/unit/lib/visionService.test.ts
