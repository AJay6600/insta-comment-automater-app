import { Browser, chromium } from 'playwright';

type InstagramLoginScriptPropsType = {
  userName: string;
  password: string;
};

type InstagramLoginResult = {
  isSuccessful: boolean;
  message: string;
};

/**
 * This function open the browser and open the instagram page and make login
 * and return the is login successful or not and message
 * @param InstagramLoginScriptPropsType the login credentials
 */
export const instagramLoginScript = async ({
  userName,
  password,
}: InstagramLoginScriptPropsType) => {
  let browser: Browser | null = null;

  try {
    // Launch browser (set headless: true for CI)
    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to Instagram login page
    await page.goto('https://www.instagram.com/accounts/login/', {
      waitUntil: 'networkidle',
    });

    // Fill credentials
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    await page.fill('input[name="username"]', userName);

    await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    await page.fill('input[name="password"]', password);

    // Click login
    await page.click('button[type="submit"]');

    // Locator for the specific incorrect-password error message (text-based)
    const incorrectPasswordLocator = page.getByText(
      'Sorry, your password was incorrect. Please double-check your password.',
      { exact: false },
    );

    // Wait for either the successful redirect OR the incorrect password message.
    // Whichever resolves first determines the result.
    const waitTimeout = 30000; // 30s
    const result = await Promise.race([
      page
        .waitForURL('**/accounts/onetap/**', { timeout: waitTimeout })
        .then(() => ({
          isSuccessful: true,
          message: 'Login successful',
        })),
      // If the error text appears first, resolve with failure message
      incorrectPasswordLocator.waitFor({ timeout: waitTimeout }).then(() => ({
        isSuccessful: false,
        message:
          'Sorry, your password was incorrect. Please double-check your password.',
      })),
    ]);

    // If `result` resolved, return it
    if (result) return result as InstagramLoginResult;

    // Fallback (should not usually be reached because Promise.race should resolve)
    return {
      isSuccessful: false,
      message: 'Login result could not be determined',
    };
  } catch (error: any) {
    // Distinguish timeout vs other errors where possible
    if (error?.name === 'TimeoutError') {
      return {
        isSuccessful: false,
        message: 'Timed out waiting for login result',
      };
    }
    return {
      isSuccessful: false,
      message: error?.message ?? 'An unknown error occurred',
    };
  } finally {
    // Ensure browser is closed
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        // swallow close errors but log if you want
        // console.error('Error closing browser', closeErr);
      }
    }
  }
};
