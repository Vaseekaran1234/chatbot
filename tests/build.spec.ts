// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pages/login';
// import { BuildUIPage } from '../pages/buildUI'; // class import — matches actual export name

// const VALID_EMAIL = 'email123@yopmail.com';
// const VALID_PASSWORD = '1234567890';

// test('Build UI Test', async ({ page }) => {
//     test.setTimeout(400000); // 400 seconds

//     const loginPage = new LoginPage(page);
//     const buildUI = new BuildUIPage(page); // instance name is distinct from the class name

//     await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

//     await buildUI.build('sample build name');
//     await buildUI.buildid();

//     // build UI fill form
//     await buildUI.newtab(
//         'vasi',
//         'sample answer',
//         'vasi@example.com', 
//         '1234567890',
//         '110320032404200',
//         'Pattabiram'

//     );

//    const responseText = await buildUI.response();
//    expect(responseText.trim().length).toBeGreaterThan(0);


// });


//_______+++++++++++++++++++-----------------_________+++++++++=============

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { BuildUIPage } from '../pages/buildUI'; // class import — matches actual export name

const VALID_EMAIL = 'email123@yopmail.com';
const VALID_PASSWORD = '1234567890';

test('Build UI Test', async ({ page }) => {
    test.setTimeout(400000); // 400 seconds

    const loginPage = new LoginPage(page);
    const buildUI = new BuildUIPage(page); // instance name is distinct from the class name

    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await buildUI.build('sample build name');
    await buildUI.buildid();

    // build UI fill form
    await buildUI.newtab(
        'vasi',
        'sample answer',
        'vasi@example.com',
        '1234567890',
        '110320032404200',
        'Pattabiram'
    );

    const responseText = await buildUI.response();
    expect(responseText.trim().length).toBeGreaterThan(0);

    // Compare every captured question/answer (from newtab) against the response page text
    // await buildUI.verifyAllAnswers(responseText);
});