// import * as fs from 'fs';
import { test, expect, type BrowserContext, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login';

const VALID_EMAIL = 'setup@rsoftai.com';
const VALID_PASSWORD = 'RSoft!@3456';

test.describe.serial('RBot Login', () => {
  let page: Page;
  let loginPage: LoginPage;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    
  });

  test('Empty Email shows required error', async ({}, testInfo) => {
    await loginPage.navigate();

    await loginPage.fillPassword('1234567890');
    await loginPage.clickSignIn(testInfo);

    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('Both fields empty shows required errors', async ({}, testInfo) => {
    await loginPage.navigate();

    await loginPage.clickSignIn(testInfo);

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('Invalid email shows Invalid Email id', async ({}, testInfo) => {
    await loginPage.navigate();

    await loginPage.fillEmail('wronguser@yopmail.com');
    await loginPage.fillPassword(VALID_PASSWORD);
    await loginPage.clickSignIn(testInfo);

    await expect(loginPage.errorMessage('Invalid Email id')).toBeVisible();
  });

  test('Incorrect password shows Incorrect Password', async ({}, testInfo) => {
    await loginPage.navigate();

    await loginPage.fillEmail(VALID_EMAIL);
    await loginPage.fillPassword('WrongPassword123');
    await loginPage.clickSignIn(testInfo);

    await expect(loginPage.errorMessage('Incorrect Password')).toBeVisible();
  });

  test('Valid login attempts to sign in', async ({}, testInfo) => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD, testInfo);

    await expect(page).not.toHaveURL('https://rbot.co.in/');

  });
  
});
