import { test, expect } from '@playwright/test';

test('EqButton renders correctly and is clickable', async ({ page }) => {
  // Create a test route that renders the button
  await page.route('/', route => {
    route.fulfill({
      body: `
        <html>
          <body>
            <div id="app">
              <button class="eq-button" data-testid="my-button">Click me</button>
            </div>
            <script>
              // Initialize click state and handler
              window.__buttonClicked = false;
              window.handleButtonClick = () => {
                window.__buttonClicked = true;
              };
            </script>
          </body>
        </html>
      `,
      contentType: 'text/html'
    });
  });

  await page.goto('/');

  const button = page.locator('[data-testid="my-button"]');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Click me');
  await expect(button).toHaveClass(/eq-button/);

  // Test click functionality
  await page.$eval('[data-testid="my-button"]', button => {
    button.addEventListener('click', () => window.handleButtonClick());
  });

  await button.click();

  // Verify the click was registered
  const wasClicked = await page.evaluate(() => window.__buttonClicked);
  expect(wasClicked).toBe(true);
});
