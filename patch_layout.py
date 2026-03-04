import re

with open('app/luxury/layout.tsx', 'r') as f:
    content = f.read()

import_patch = """import React from 'react'
import AmbientAudio from '@/components/AmbientAudio'"""

content = content.replace("import React from 'react'", import_patch)

component_patch = """      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
      `}} />
      <AmbientAudio />
      {children}"""

content = re.sub(r'      <style dangerouslySetInnerHTML=\{{__html: `\n        \.material-symbols-outlined \{\n          font-family: \'Material Symbols Outlined\';\n          font-weight: normal;\n          font-style: normal;\n          font-size: 24px;\n          line-height: 1;\n          letter-spacing: normal;\n          text-transform: none;\n          display: inline-block;\n          white-space: nowrap;\n          word-wrap: normal;\n          direction: ltr;\n          -webkit-font-smoothing: antialiased;\n        \}\n      `\}} />\n      \{children\}', component_patch, content)

with open('app/luxury/layout.tsx', 'w') as f:
    f.write(content)
