import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://rbot.co.in/');
    await this.page.waitForSelector('#signin_button');
  }

  async fillEmail(email: string) {
    await this.page.locator('#email1').fill(email);
  }

  async fillPassword(password: string) {
    await this.page.locator('#password1').fill(password);
  }

  async clickSignIn() {
    await this.page.locator('#signin_button').click();
  }

  async login(email: string, password: string) {
    await this.navigate();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }
}
