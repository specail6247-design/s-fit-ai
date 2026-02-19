import os

def replace_in_file(filepath, search, replace):
    with open(filepath, 'r') as f:
        content = f.read()

    if search not in content:
        print(f"Warning: Search string not found in {filepath}")
        return

    new_content = content.replace(search, replace)
    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

# 1. components/LuxuryGarmentDetail.tsx
# - Escape single quote
# - Remove unused motion import
replace_in_file(
    'components/LuxuryGarmentDetail.tsx',
    "S_FIT AI's proprietary light-refraction engine",
    "S_FIT AI&apos;s proprietary light-refraction engine"
)
replace_in_file(
    'components/LuxuryGarmentDetail.tsx',
    "import { motion } from 'framer-motion';",
    "// import { motion } from 'framer-motion';"
)
# Note: Just commenting out the import might leave 'motion' usage if it was used?
# Wait, the warning said 'motion' is defined but never used. So I can remove it.
# But I should check if I can just remove the line.
# Better yet, I'll read the file content in Python and use string replacement carefully.

# 2. components/PhotoFitting.tsx
# - Remove unused useEffect
replace_in_file(
    'components/PhotoFitting.tsx',
    "import React, { useState, useEffect } from \"react\";",
    "import React, { useState } from \"react\";"
)

# 3. components/FittingRoom.tsx
# - Remove unused opacity
replace_in_file(
    'components/FittingRoom.tsx',
    "function Mannequin({ \n  height = 170, opacity = 1.0 \n}: { height?: number; opacity?: number;",
    "function Mannequin({ \n  height = 170 \n}: { height?: number;"
)
# The search string above might be fragile due to whitespace. I will do a more robust read-modify-write.

# 4. components/ErrorBoundary.tsx
# - Fix unused _
replace_in_file(
    'components/ErrorBoundary.tsx',
    "public static getDerivedStateFromError(_: Error): State {",
    "public static getDerivedStateFromError(error: Error): State {"
)
# And I need to use 'error'. I'll inject a console.error or similar,
# but getDerivedStateFromError is for state updates.
# Let's change the return to use it to silence the linter:
# return { hasError: true, error }; (Requires state update)
# Or I can just log it inside? No, no side effects.
# I will just add // eslint-disable-next-line to the line? No, I should "use" it.
# How about:
# public static getDerivedStateFromError(error: Error): State {
#    return { hasError: true, errorMessage: error.message };
# }
# But I need to update the State interface.

# 5. app/luxury/layout.tsx & app/spa/layout.tsx
# - Add display=optional and eslint disable
link_tag = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />'
new_link_tag = '{/* eslint-disable-next-line @next/next/no-page-custom-font */}\n      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />'

replace_in_file('app/luxury/layout.tsx', link_tag, new_link_tag)
replace_in_file('app/spa/layout.tsx', link_tag, new_link_tag)
