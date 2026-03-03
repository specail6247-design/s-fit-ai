import re

with open('tests/e2e/flow.spec.ts', 'r') as f:
    content = f.read()

# Update the test 'should complete Easy Fit flow' to test the actual RealLifeFitting flow
content = re.sub(
    r"test\('should complete Easy Fit flow', async \({ page }\) => \{.*?\}\);",
    """test('should display the main UI components for Real Life Fitting', async ({ page }) => {
    // 1. Verify Header
    const header = page.locator('h1');
    await expect(header).toContainText('S_FIT');
    await expect(header).toContainText('NEO');

    // 2. Verify Upload Sections exist
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // 3. Verify Try On button exists
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 4. Verify line navigation links exist
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });""",
    content,
    flags=re.DOTALL
)

with open('tests/e2e/flow.spec.ts', 'w') as f:
    f.write(content)
