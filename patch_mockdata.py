import re

with open('data/mockData.ts', 'r') as f:
    content = f.read()

# Add stylingTip and isLocked to ClothingItem interface
interface_patch = """
  isLuxury: boolean;
  isLocked?: boolean;
  stylingTip?: string;
  sizes: string[];
"""
content = re.sub(r'\n\s*isLuxury: boolean;\n\s*sizes: string\[\];', '\n' + interface_patch, content)

# Add stylingTip and isLocked to gucci-001
gucci_001_patch = """
    isLuxury: true,
    isLocked: true,
    stylingTip: "Pair this statement blazer with structured denim for a balanced, modern silhouette.",
    sizes: ['IT 44', 'IT 46', 'IT 48', 'IT 50', 'IT 52'],
"""
content = re.sub(r'\n\s*isLuxury: true,\n\s*sizes: \[\'IT 44\', \'IT 46\', \'IT 48\', \'IT 50\', \'IT 52\'\],(?=\n\s*colors: \[\'Beige/Ebony\'\],\n\s*description: \'Iconic GG pattern wool blazer with silk lining\',\n\s*},)', '\n' + gucci_001_patch, content)

# Add stylingTip to zara-001
zara_001_patch = """
    isLuxury: false,
    stylingTip: "Layer over a fitted turtleneck to emphasize the structured shoulders.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
"""
content = re.sub(r'\n\s*isLuxury: false,\n\s*sizes: \[\'XS\', \'S\', \'M\', \'L\', \'XL\'\],(?=\n\s*colors: \[\'Black\', \'Navy\', \'Beige\'\],\n\s*description: \'Relaxed fit blazer with structured shoulders\',\n\s*},)', '\n' + zara_001_patch, content)

with open('data/mockData.ts', 'w') as f:
    f.write(content)
