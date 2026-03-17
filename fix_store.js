const fs = require('fs');
const storePath = 'store/useStore.ts';
let content = fs.readFileSync(storePath, 'utf8');
content = content.replace(
  /(\s+)(\/\/ Selected Brand & Item\n\s+selectedBrand: string \| null;)/g,
  `$1// Vault (Digital Wardrobe)
  vaultItems: ClothingItem[];
  isVaultOpen: boolean;
  addToVault: (item: ClothingItem) => void;
  removeFromVault: (id: string) => void;
  setVaultOpen: (isOpen: boolean) => void;

$1$2`
);
fs.writeFileSync(storePath, content, 'utf8');
