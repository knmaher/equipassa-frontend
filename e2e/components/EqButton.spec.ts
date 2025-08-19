import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    __buttonClicked: boolean
    handleButtonClick: () => void
  }
}
export {}

test('EqButton renders correctly and is clickable', async ({ page }) => {
  await page.route('/', (route) => {
    route.fulfill({
      contentType: 'text/html',
      body: `
        <html>
          <body>
            <div id="app">
              <button class="eq-button" data-testid="my-button" onclick="window.handleButtonClick()">Click me</button>
            </div>
            <script>
              window.__buttonClicked = false;
              window.handleButtonClick = () => { window.__buttonClicked = true; };
            </script>
          </body>
        </html>
      `,
    });
  });

  await page.goto('/');

  const button = page.locator('[data-testid="my-button"]');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Click me');
  await expect(button).toHaveClass(/eq-button/);

  await button.click();

  const wasClicked = await page.evaluate<boolean>(() => window.__buttonClicked)
  expect(wasClicked).toBe(true);
});
