/*import {Page} from '@playwright/test';
export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLoginPage() {
    await this.page.goto('https://rbot.co.in/');
  }

  async emailid(email: string) {
    await this.page.locator('#email1').fill(email);

  }

  async ePassword(password: string) {
    await this.page.locator('#password1').fill(password);

  }
  async clickLoginButton() {
    await this.page.getByRole('button', {name: 'SIGN IN'}).click();
    
}

  async login(email: string, password: string) {
    await this.navigateToLoginPage();
    await this.emailid(email);
    await this.ePassword(password);
    await this.clickLoginButton();
  }


}*/

import { test, expect } from '@playwright/test';

test.describe('Chatbot Login - Negative Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://rbot.co.in/');
    });

    test('Empty Username', async ({ page }) => {
        await page.getByLabel('Password').fill('Password123');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Username is required')).toBeVisible();
    });

    test('Both Fields Empty', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Username is required')).toBeVisible();
        await expect(page.getByText('Password is required')).toBeVisible();
    });

    test('Invalid Username', async ({ page }) => {
        await page.getByLabel('Username').fill('wronguser');
        await page.getByLabel('Password').fill('Password123');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Invalid username or password')).toBeVisible();
    });

    test('Invalid Password', async ({ page }) => {
        await page.getByLabel('Username').fill('admin');
        await page.getByLabel('Password').fill('wrongpassword');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByText('Invalid username or password')).toBeVisible();
    });

});