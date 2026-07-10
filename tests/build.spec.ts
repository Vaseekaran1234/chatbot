import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { BuildUIPage } from '../pages/buildUI';

const VALID_EMAIL = 'email123@yopmail.com';
const VALID_PASSWORD = '1234567890';

test('Build UI Test', async ({ page }) => {
    test.setTimeout(400000); // Set the timeout to 5 minutes (300,000 milliseconds)
    const loginPage = new LoginPage(page);
    const buildUIPage = new BuildUIPage(page);

    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
   
     await buildUIPage.build('sample build name');  

     await buildUIPage.buildid();

     // build Ui fill form  
     await buildUIPage.newtab('vasi'
        , 'sample answer'
        , 'vasi@example.com'
        , '1234567890'
        , '110320032404200');

})
