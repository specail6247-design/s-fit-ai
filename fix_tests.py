
import os

def replace_in_file(filepath, search, replace):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        if search not in content:
            print(f"Warning: '{search}' not found in {filepath}")
            return

        new_content = content.replace(search, replace)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    except FileNotFoundError:
        print(f"Error: {filepath} not found")

# Fix flow.spec.ts
replace_in_file(
    'tests/e2e/flow.spec.ts',
    "const continueToModeBtn = page.getByRole('button', { name: /Continue →/i });",
    "// Scope to the specific card\n    const continueToModeBtn = page.locator('.mode-card').filter({ hasText: 'EASY FIT' }).getByRole('button', { name: /Continue →/i });"
)

# Fix home.spec.ts
replace_in_file(
    'tests/e2e/home.spec.ts',
    "const continueBtn = page.getByRole('button', { name: /Continue/i });",
    "// Check that at least one continue button exists (since there are 3 now)\n    const continueBtn = page.getByRole('button', { name: /Continue/i }).first();"
)
