import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { BuildUIPage } from '../pages/buildUI';

const VALID_EMAIL = 'email123@yopmail.com';
const VALID_PASSWORD = '1234567890';

test('Build UI Test', async ({ page }) => {
  test.setTimeout(400000); // 400 seconds

  const loginPage = new LoginPage(page);
  const buildUI = new BuildUIPage(page);

  // Login
  await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

  // Create build and configure form
  await buildUI.build('sample build name');
  await buildUI.buildid();

  // Data to submit in the survey form
  const submittedData = {
    name: 'vasi',
    ans: 'sample answer',
    email: 'vasi@example.com',
    phoneno: '1234567890',
    num: '110320032404200',
    map: 'Pattabiram',
  };

  // Submit the form
  await buildUI.newtab(
    submittedData.name,
    submittedData.ans,
    submittedData.email,
    submittedData.phoneno,
    submittedData.num,
    submittedData.map
  );

  // Capture the response text from the built form's response view
  const responseText = await buildUI.response();
  expect(
    responseText.trim().length,
    'Response text should not be empty — check debug-empty-response.png'
  ).toBeGreaterThan(0);

  // Compare submitted values with captured response (checks ALL fields, not just 6)
  const isMatching = await buildUI.verifyAllAnswers(responseText, submittedData);

  expect(isMatching, 'Submitted data did not match response — see field-level log above').toBeTruthy();
});