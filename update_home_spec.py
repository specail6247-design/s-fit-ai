import re

with open('tests/e2e/home.spec.ts', 'r') as f:
    content = f.read()

# Update the test 'should display mode selection options' to match the new UI (RealLifeFitting)
content = re.sub(
    r"test\('should display mode selection options', async \({ page }\) => \{.*?\}\);",
    """test('should display the identification and garment upload sections', async ({ page }) => {
    // Check for presence of the main upload labels
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check action button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });""",
    content,
    flags=re.DOTALL
)

with open('tests/e2e/home.spec.ts', 'w') as f:
    f.write(content)
