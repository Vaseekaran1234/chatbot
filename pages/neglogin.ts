import { Page } from '@playwright/test';
import { LoginPage } from './login';

export function createLoginPage(page: Page) {
  return new LoginPage(page);
}
