// Verify mockData.ts integrity
import { mockClothingItems, brands } from '../data/mockData';

console.log('Verifying mockData.ts...');

const brandIds = new Set(brands.map(b => b.id));
const itemIds = new Set();
const categories = ['tops', 'bottoms', 'outerwear', 'dresses', 'accessories'];
const subCategories = ['bag', 'hat', 'jewelry', 'scarf', 'glasses'];

let errors = 0;

// Check Brands
if (!brandIds.has('burberry')) {
  console.error('FAIL: Burberry brand missing from brands array');
  errors++;
} else {
  console.log('PASS: Burberry brand present');
}

// Check Items
mockClothingItems.forEach(item => {
  if (itemIds.has(item.id)) {
    console.error(`FAIL: Duplicate Item ID: ${item.id}`);
    errors++;
  }
  itemIds.add(item.id);

  if (!categories.includes(item.category)) {
    console.error(`FAIL: Invalid category for ${item.id}: ${item.category}`);
    errors++;
  }

  if (item.category === 'accessories' && !subCategories.includes(item.subCategory)) {
    console.error(`FAIL: Invalid subCategory for accessory ${item.id}: ${item.subCategory}`);
    errors++;
  }

  // Check Burberry Scarf specific
  if (item.id === 'burberry-scarf-001') {
    if (item.brand !== 'Burberry') {
      console.error(`FAIL: Burberry Scarf has wrong brand: ${item.brand}`);
      errors++;
    }
    if (item.subCategory !== 'scarf') {
      console.error(`FAIL: Burberry Scarf has wrong subCategory: ${item.subCategory}`);
      errors++;
    }
    if (item.material !== 'Cashmere Wool') {
      console.error(`FAIL: Burberry Scarf has wrong material: ${item.material}`);
      errors++;
    }
    console.log('PASS: Burberry Scarf item verified');
  }
});

if (errors === 0) {
  console.log('SUCCESS: mockData.ts verification passed!');
} else {
  console.error(`FAILED: ${errors} errors found in mockData.ts`);
  process.exit(1);
}
