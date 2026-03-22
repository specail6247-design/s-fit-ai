import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace <img ... /> with {/* eslint-disable-next-line @next/next/no-img-element */}<img ... />
    # taking care of the context (JSX)
    # We will use simple search and replace for the exact lines

    # Actually, the error might be because we inserted a comment inside `{condition ? <img /> : ...}` which breaks JSX syntax
    # We need to ensure the comment is before the tag, or just use <img ... /> but add the ignore at the top of the file

    # Easiest way to fix `no-img-element` globally for a file is to add `/* eslint-disable @next/next/no-img-element */` at the top

    if '/* eslint-disable @next/next/no-img-element */' not in content:
        content = '/* eslint-disable @next/next/no-img-element */\n' + content

    with open(filepath, 'w') as f:
        f.write(content)

fix_file('components/RealLifeFitting.tsx')
fix_file('components/SimpleTryOn.tsx')
