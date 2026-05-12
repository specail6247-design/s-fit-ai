const fs = require('fs');

let layout = fs.readFileSync('app/layout.tsx', 'utf8');

if (!layout.includes('material-symbols-outlined')) {
  layout = layout.replace(
    '</head>',
    '  {/* Material Symbols */}\n  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" rel="stylesheet" />\n  </head>'
  );
  if (!layout.includes('</head>')) {
    layout = layout.replace(
      '<body',
      '  <head>\n    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" rel="stylesheet" />\n  </head>\n  <body'
    );
  }
}

fs.writeFileSync('app/layout.tsx', layout);
