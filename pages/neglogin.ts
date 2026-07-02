import (Page) from '@playwright/test';
import { LoginPage } from "../pages/login";

const loginPage = new LoginPage(page: Page);
