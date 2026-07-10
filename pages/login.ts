import { type TestInfo, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://rbot.co.in/');
    await this.page.getByRole('button', { name: /sign in/i }).waitFor({ state: 'visible', timeout: 60000 });
  }

  async fillEmail(email: string) {
    await this.page.getByPlaceholder('Enter your email id').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByPlaceholder('Enter your password').fill(password);
  }

  async clickSignIn(testInfo?: TestInfo) {
    const signInButton = this.page.getByRole('button', { name: /sign in/i });

    await signInButton.click();

    if (testInfo) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await testInfo.attach('after sign in', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  }

  async clickSignUpIfExists() {
    const signUpButton = this.page
      .locator('#signup_button, #signup, [id*="signup" i], [id*="sign_up" i], [href*="signup" i], [href*="sign-up" i]')
      .or(this.page.getByRole('button', { name: /sign\s*up/i }))
      .or(this.page.getByRole('link', { name: /sign\s*up/i }))
      .first();

    if (await signUpButton.count() === 0) {
      return false;
    }

    await signUpButton.click();
    return true;
  }

  errorMessage(text: string) {
    return this.page.locator('span.error-message').and(this.page.getByText(text));
  }

  async login(email: string, password: string, testInfo?: TestInfo) {
    await this.navigate();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn(testInfo);
  }
}
