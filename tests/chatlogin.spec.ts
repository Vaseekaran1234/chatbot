import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

const VALID_EMAIL = 'setup@rsoftai.com';
const VALID_PASSWORD = 'RSoft!@3456';

test.describe('RBot Login', () => {
  test('Empty Email shows required error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.fillPassword('1234567890');
    await loginPage.clickSignIn();

    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Both fields empty shows required errors', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.clickSignIn();

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('Invalid credentials show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    await loginPage.fillEmail('wronguser@yopmail.com');
    await loginPage.fillPassword('WrongPassword123');
    await loginPage.clickSignIn();

    await expect(page.getByText(/invalid|incorrect|error/i)).toBeVisible();
  });

  test('Valid login attempts to sign in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await expect(page).not.toHaveURL('https://rbot.co.in/');
  });
});

