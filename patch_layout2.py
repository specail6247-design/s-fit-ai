import re

with open('app/luxury/layout.tsx', 'r') as f:
    content = f.read()

import_patch = """import React from 'react'
import AmbientAudio from '@/components/AmbientAudio'
import TheVault from '@/components/TheVault'"""

content = content.replace("import React from 'react'\nimport AmbientAudio from '@/components/AmbientAudio'", import_patch)

component_patch = """      <AmbientAudio />
      <TheVault />
      {children}"""

content = content.replace("<AmbientAudio />\n      {children}", component_patch)

with open('app/luxury/layout.tsx', 'w') as f:
    f.write(content)
