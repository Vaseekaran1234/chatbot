import { test } from '@playwright/test';
import { LoginPage } from "../pages/login";

test('LoginPage', async ({ page }) => {   
  const loginPage = new LoginPage(page);

    await loginPage.login('email123@yopmail.com', '1234567890');
    
});