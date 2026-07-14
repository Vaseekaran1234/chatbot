import { expect, Page } from '@playwright/test';

export class BuildUIPage {
  readonly page: Page;

  newTab: Page | null = null; // Global variable to access the form page

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://rbot.co.in/build');
    await expect(this.page.getByText('Add build', { exact: true })).toBeVisible({ timeout: 120000 });
  }

  async build(baseName: string) {
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const generatedBuildName = 'test' + ` ${randomSuffix}`;

    await this.page.getByText('Add build', { exact: true }).click();
    const buildNameInput = this.page.locator('.swal2-input').first();
    await buildNameInput.fill(generatedBuildName);
    await this.page.getByRole('button', { name: /^create$/i }).click();
    await expect(this.page.locator('dialog')).toBeHidden({ timeout: 60000 });

    return generatedBuildName;
  }

  async buildid() {
    await this.page.getByText('Build ', { exact: true }).click();

    await this.page.getByText('Build Script', { exact: true }).click();
    await this.page.getByText('Message', { exact: true }).click();
    await this.page.getByText('Name', { exact: true }).click();
    await this.page.getByText('Text Question', { exact: true }).click();
    await this.page.getByText('Email', { exact: true }).click();
    await this.page.getByText('Phone Number', { exact: true }).click();
    await this.page.getByText('Appointment', { exact: true }).click();
    await this.page.getByText('List', { exact: true }).click();
    await this.page.getByText('Number', { exact: true }).click();
    await this.page.getByText('Rating', { exact: true }).click();
    await this.page.getByText('Opinion Scale', { exact: true }).click();
    await this.page.getByText('Date', { exact: true }).click();
    await this.page.getByText('Links', { exact: true }).click();
    await this.page.getByText('Thank you', { exact: true }).click();
    await this.page.getByText('Section', { exact: true }).click();
    await this.page.getByText('Picture Message', { exact: true }).click();
    await this.page.getByText('Yes Or No ', { exact: true }).click();
    await this.page.getByText('Agreement', { exact: true }).click();
    await this.page.getByText('Ranking (Matrix)', { exact: true }).click();
    await this.page.getByText('Voice Record ', { exact: true }).click();
    await this.page.getByText('Google Map', { exact: true }).click();

    await this.page.getByText('Publish', { exact: true }).click();
    await this.page.getByText('Yes, Publish', { exact: true }).click();

    await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    const shareButton = this.page.locator('.header-link-btn').first();
    await shareButton.waitFor({ state: 'visible', timeout: 30000 });
    await shareButton.click();

    const copiedUrl = await this.page.evaluate(async () => await navigator.clipboard.readText());
    console.log('Copied URL:', copiedUrl);

    this.newTab = await this.page.context().newPage();

    await this.newTab.goto(copiedUrl, {
      waitUntil: 'domcontentloaded',
    });

    console.log('New tab URL:', this.newTab.url());
  }

  private ensureNewTab(): asserts this is { newTab: Page } {
    if (!this.newTab || this.newTab.isClosed()) {
      throw new Error('New tab is closed or unavailable');
    }
  }

  async newtab(
    name: string,
    ans: string,
    email: string,
    phoneno: string,
    num: string,
    map: string
  ): Promise<void> {
    this.ensureNewTab();
    const newTab = this.newTab;
    await newTab.waitForLoadState('domcontentloaded');
    await newTab.getByText('Next').click();
    await newTab.waitForTimeout(2000);

    // name
    await newTab.locator('input.name-show').fill(name);
    await newTab.locator('button:has-text("Next")').click();

    // type an answer
    await newTab.locator('#textquestion_textarea').fill(ans);
    await newTab.locator('button:has-text("Next")').click();

    // email
    await newTab.locator('#ems_email').fill(email);
    await newTab.locator('button:has-text("Next")').click();

    // phone number
    await newTab.locator('#phs_phonenumber').fill(phoneno);
    await newTab.locator('button:has-text("Next")').click();

    // appointment
    await newTab.locator("button[type='text']").click();
    await newTab.locator('svg:visible').click();
    await newTab.locator('div').filter({ hasText: '23' }).last().click();
    await newTab.getByText('   01:00 PM - 01:29 PM  ', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // list
    await newTab.locator('input:visible').click();
    await newTab.getByText('Sample Option', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // number
    await newTab.locator('#numbershow').fill(num);
    await newTab.locator('button:has-text("Next")').click();

    // rating
    await newTab.getByText('Good', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // opinion scale
    await newTab.locator('li').filter({ hasText: '9' }).click();
    await newTab.locator('button:has-text("Next")').click();

    // date
    await newTab.locator('input:visible').click();
    await newTab.getByText('10', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // link
    await newTab.locator('button:has-text("Next")').click();

    // thank you
    await newTab.locator('button:has-text("Next")').click();

    // section
    await newTab.locator('button:has-text("Next")').click();

    // picture
    await newTab.locator('img.picmsgshow-valueimg').click();
    await newTab.locator('button:has-text("Next")').click();

    // yes or no
    await newTab.getByText('Yes', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // agreement
    await newTab.locator('button:has-text("Next")').click();

    // ranking (matrix)
    await newTab.locator(`//tr[td[normalize-space()='Row-1']]//button`).nth(1).click();
    await newTab.locator('button:has-text("Next")').click();

    // voice record
    await newTab.getByText('mic', { exact: true }).click();
    await newTab.getByText('pause', { exact: true }).click();
    await newTab.getByText('stop', { exact: true }).click();
    await newTab.locator('button:has-text("Next")').click();

    // google map
    await newTab.locator('input[type="text"]').fill(map);
    await newTab.getByText('OK', { exact: true }).click();
    await newTab.locator('button:has-text("Submit")').click();

    // wait to ensure submission is fully processed server-side before we go read it back
    await newTab.waitForTimeout(3000);

    // close tab
    await newTab.close();
    await this.page.bringToFront();
  }

  async response(): Promise<string> {
    await this.page.getByText('Result', { exact: true }).click();
    await this.page.getByText('Responses', { exact: true }).click();

    const firstRow = this.page.locator('table tbody tr').first();
    await firstRow.waitFor({ state: 'visible', timeout: 30000 });

    const menuCell = firstRow.locator('td').first();
    await menuCell.waitFor({ state: 'visible', timeout: 15000 });
    await menuCell.click({ force: true });

    const dialog = this.page.locator('mat-dialog-container[role="dialog"]');
    await dialog.waitFor({ state: 'visible', timeout: 15000 });

    const previewFrame = dialog.locator('iframe[title="Form preview"]');
    await previewFrame.waitFor({ state: 'attached', timeout: 15000 });

    const frameElementHandle = await previewFrame.elementHandle();
    const frame = await frameElementHandle?.contentFrame();

    if (!frame) {
      await this.page.screenshot({ path: 'debug-no-frame.png', fullPage: true });
      throw new Error('Form preview iframe did not load after opening the response menu.');
    }

    await frame.waitForLoadState('domcontentloaded').catch(() => {});
    await frame.waitForLoadState('networkidle').catch(() => {});

    const responseBody = frame.locator('body');
    await responseBody.waitFor({ state: 'visible', timeout: 15000 });

    let responseSectionText = '';
    const maxAttempts = 10;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const responseRows = frame.locator('.epsf-row');
      const responseRowCount = await responseRows.count();

      if (responseRowCount > 0) {
        responseSectionText = (
          await responseRows.evaluateAll((rows) =>
            rows
              .map((row) => row.textContent?.replace(/\s+/g, ' ').trim())
              .filter((value): value is string => Boolean(value))
          )
        ).join('\n\n');
      } else {
        responseSectionText = (await responseBody.innerText()).trim();
      }

      if (responseSectionText.length > 0) {
        console.log(`Response text captured on attempt ${attempt}`);
        break;
      }

      console.log(`Attempt ${attempt}: response text still empty, retrying...`);
      await this.page.waitForTimeout(1500);
    }

    if (!responseSectionText) {
      await this.page.screenshot({ path: 'debug-empty-response.png', fullPage: true });
      console.log('WARNING: response text is still empty after all retries.');
    }

    console.log('Captured response sidebar contents:', responseSectionText);

    return responseSectionText;
  }

  /**
   * Compares ALL submitted/expected form values against the captured response text.
   * Logs a per-field ✅/❌ result, then an overall "data is matching" / "data not matching".
   */
  async verifyAllAnswers(
    responseText: string,
    submitted: {
      name: string;
      ans?: string;
      email?: string;
      phoneno?: string;
      num?: string;
      map?: string;
    }
  ): Promise<boolean> {
    const normalizedResponse = responseText.replace(/\s+/g, ' ').trim().toLowerCase();

    const contains = (value: string) => normalizedResponse.includes(value.trim().toLowerCase());

    // Fields driven by dynamic parameters (passed into newtab())
    const dynamicFields: { label: string; value?: string }[] = [
      { label: 'Name', value: submitted.name },
      { label: 'Text Question Answer', value: submitted.ans },
      { label: 'Email', value: submitted.email },
      { label: 'Phone', value: submitted.phoneno },
      { label: 'Number', value: submitted.num },
      { label: 'Map', value: submitted.map },
    ];

    // Fields that are hardcoded inside newtab() (fixed selections/clicks),
    // so we verify against the same fixed values here.
    const fixedFields: { label: string; check: () => boolean }[] = [
      { label: 'Appointment Time', check: () => contains('01:00 PM') },
      { label: 'List Selection', check: () => contains('Sample Option') },
      { label: 'Rating', check: () => contains('Good') },
      { label: 'Opinion Scale', check: () => contains('9') },
      { label: 'Date Selection', check: () => contains('10/') || contains(' 10,') || contains(' 10 ') },
      { label: 'Yes/No Answer', check: () => contains('Yes') },
      { label: 'Agreement/Terms', check: () => contains('Accepted') },
      { label: 'Ranking Matrix', check: () => contains('Row-1') && contains('Col-2') },
      { label: 'Voice Record', check: () => contains('voice_record') || contains('.mp3') },
    ];

    let allMatched = true;
  
    console.log('========== FIELD VERIFICATION ==========');

    for (const field of dynamicFields) {
      if (!field.value) continue;
      const isMatch = contains(field.value);
      console.log(`${isMatch ? '✅' : '❌'} ${field.label} ${isMatch ? 'matched' : 'NOT matched'}: "${field.value}"`);
      if (!isMatch) allMatched = false;
    }

    for (const field of fixedFields) {
      const isMatch = field.check();
      console.log(`${isMatch ? '✅' : '❌'} ${field.label} ${isMatch ? 'matched' : 'NOT matched'}`);
      if (!isMatch) allMatched = false;
    }

    console.log('==========================================');
    console.log(allMatched ? 'data is matching' : 'data not matching');
    console.log('==========================================');

    return allMatched;
  }
}