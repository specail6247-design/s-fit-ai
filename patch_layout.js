const fs = require('fs');
let content = fs.readFileSync('app/layout.tsx', 'utf8');
content = content.replace(
  '<head>',
  '<head>\n    {/* eslint-disable-next-line @next/next/no-page-custom-font */}'
);
fs.writeFileSync('app/layout.tsx', content);
