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
    // await this.navigate();

    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const generatedBuildName = 'test' +` ${randomSuffix}`;

    await this.page.getByText('Add build', { exact: true }).click();
    // const buildNameInput = this.page.locator('dialog').getByRole('textbox');
    const buildNameInput = this.page.locator('.swal2-input').first();
    // await expect(buildNameInput).toBeVisible({ timeout: 60000 });
    await buildNameInput.fill(generatedBuildName);
    await this.page.getByRole('button', { name: /^create$/i }).click();
     await expect(this.page.locator('dialog')).toBeHidden({ timeout: 60000 });

    return generatedBuildName;

  //  await this.page.getByRole('button', { name: 'Create' }).click();

  }

  async buildid() {
     await expect(this.page.getByText('Build ', { exact: true })).toBeVisible({ timeout: 60000 });
    // await this.page.getByText('Build ', { exact: true }).click(); 
     
    // await this.page.locator('span:has-text("Build Script")').click();
     await this.page.getByText('Build Script', {exact: true}).click();
     await this.page.getByText('Message', {exact: true}).click();
     await this.page.getByText('Name', {exact: true}).click();
     await this.page.getByText('Multi Choice', {exact: true}).click();
     await this.page.getByText('Text Question', {exact: true}).click();
     await this.page.getByText('Email', {exact: true}).click();
     await this.page.getByText('Phone Number', {exact: true}).click();
     await this.page.getByText('Appointment', {exact: true}).click();
     await this.page.getByText('Multi Select/List', {exact: true}).click();
    // await this.page.getByText('List', {exact: true}).click();
     await this.page.getByText('Number', {exact: true}).click();
    //await this.page.getByText('Range', {exact: true}).click();
     await this.page.getByText('Rating', {exact: true}).click();
     await this.page.getByText('Opinion Scale', {exact: true}).click();
     await this.page.getByText('Date', {exact: true}).click();
    // await this.page.getByText('File Upload', {exact: true}).click();
     await this.page.getByText('Links', {exact: true}).click();
     await this.page.getByText('Thank you', {exact: true}).click();
     await this.page.getByText('Section', {exact: true}).click();
     await this.page.getByText('Picture Message', {exact: true}).click();
     await this.page.getByText('Yes Or No ', {exact: true}).click();
     await this.page.getByText('Agreement', {exact: true}).click();
     await this.page.getByText('Ranking (Matrix)', {exact: true}).click();
     await this.page.getByText('Voice Record ', {exact: true}).click();
     //await this.page.getByText('Google Map', {exact: true}).click();
     //await this.page.getByText('Spin Wheel', {exact: true}).click(); 
     //await this.page.getByText('Questionnaires', {exact:true}).click();*/

     await this.page.getByText('Publish', {exact: true}).click();
     await this.page.getByText('Yes, Publish', {exact: true}).click();

     //copy link
     await this.page.locator("//button[@class='waves-effect waves-block header-link-btn']//*[name()='svg']").click();

     // 1. paste new tab
       const copiedUrl = await this.page.evaluate(() => navigator.clipboard.readText());
      console.log('Copied URL:', copiedUrl);
 
      // 2. Use the existing page for the copied form URL instead of opening a second tab

      this.newTab = await this.page.context().newPage();

      await this.newTab.goto(copiedUrl, {
      waitUntil: 'domcontentloaded'
});

console.log('New tab URL:', this.newTab.url());
    }
      private ensureNewTab(): asserts this is { newTab: Page } {
        if (!this.newTab || this.newTab.isClosed()) {
          throw new Error('New tab is closed or unavailable');
        }
      }

      async newtab(name: string, 
          ans: string
        , email: string
        , phoneno: string
        , num: string

      
      ): Promise<void> {
        this.ensureNewTab();
        const newTab = this.newTab;
        await newTab.waitForLoadState('domcontentloaded');
        await newTab.getByText('Next').click();
         await newTab.waitForTimeout(2000);

        //name 
        await newTab.locator('input.name-show').fill(name);
        await newTab.locator('button:has-text("Next")').click();

        //multi choice
        // await newTab.getByText(' Sample Option', {expact: true}).click();
        // await newTab.locator('button:has-text("Next")').click();

       //type an ans
       await newTab.locator('#textquestion_textarea').fill(ans);
       await newTab.locator('button:has-text("Next")').click();

       //email
        await newTab.locator('#ems_email').fill(email);
        await newTab.locator('button:has-text("Next")').click();
        
        //phone number
        await newTab.locator('#phs_phonenumber').fill(phoneno);
        await newTab.locator('button:has-text("Next")').click();

        //appointment
        
        await newTab.locator("button[type='text']").click();
        await newTab.locator('svg:visible').click();
        await newTab.locator('div').filter({ hasText: '13' }).last().click();
        await newTab.getByText('  12:00 PM - 12:29 PM  ', {exact:true}).click();
        await newTab.locator('button:has-text("Next")').click();

        //multi select
        // await newTab.locator(':text-is("Select options")').click();
        // await newTab.getByRole('button', {name :'Sample Option'}).click();
        // await newTab.locator('button:has-text("Next")').click(); 

        //list
        // await newTab.getByRole('textbox', { name: 'Choose an option below' }).fill(list);
        // await newTab.locator('input.ng-pristine.ng-valid.ng-touched').click();
        // await newTab.getByText('Sample Option',{exact: true}).click();
        // await newTab.locator('button:has-text("Next")').click();

        //number
        await newTab.locator('#numbershow').fill(num);
        await newTab.locator('button:has-text("Next")').click();

        //range
        /*const sliderThumb = newTab.locator('.mat-slider-thumb');
        await sliderThumb.waitFor({ state: 'visible', timeout: 30000 });
        const thumbBox = await sliderThumb.boundingBox();
        if (thumbBox) {
          const startX = thumbBox.x + thumbBox.width / 2;
          const centerY = thumbBox.y + thumbBox.height / 2;
          const endX = startX + 150;
          await newTab.mouse.move(startX, centerY);
          await newTab.mouse.down();
          await newTab.mouse.move(endX, centerY, { steps: 10 });
          await newTab.mouse.up();
        }*/

        //rating
        await newTab.getByText('Good', {exact:true}).click();
        await newTab.locator('button:has-text("Next")').click();

        //option 
        await newTab.locator('li').filter({ hasText: '9' }).click();
        await newTab.locator('button:has-text("Next")').click();

        //date
        await newTab.locator('input:visible').click();
        await newTab.getByText('10', { exact: true }).click();
        await newTab.locator('button:has-text("Next")').click();

        //file
        // await newTab.getByText('Drag & drop or click to upload', {exact: true}).click();
        // await newTab.locator('button:has-text("Next")').click();


        //Link
         await newTab.locator('button:has-text("Next")').click();

        //Thank you
        await newTab.locator('button:has-text("Next")').click();

        //section
        await newTab.locator('button:has-text("Next")').click();

        //picture
        await newTab.locator('img.picmsgshow-valueimg').click();
        await newTab.locator('button:has-text("Next")').click();

        //Yes or no
        await newTab.getByText('Yes', {exact: true}).click();
        //await page.locator(':text-is("Yes")')
        await newTab.locator('button:has-text("Next")').click();

        //Terms and Conditions..
        await newTab.locator('button:has-text("Next")').click();

        //choose value
        await newTab.locator(`//tr[td[normalize-space()='Row-1']]//button`).nth(1).click();
        // await newTab.locator('.matrixshow-radiobtn myanimation radioBtnClick1Class:visible').first().click();

        await newTab.locator('button:has-text("Next")').click();

        //voice
        await newTab.getByText('mic', {exact: true}).click();
        await newTab.getByText('pause', {exact:true}).click();
        await newTab.getByText('stop', {exact:true}).click();
      //  await newTab.locator('button:has-text("Next")').click();
        await newTab.locator('button:has-text("Submit")').click();

        //map
        //await newTab.locator('input[type="text"]')
        //await newTab.locator('button:has-text("Next")').click();

        //spinwheel
        //await newTab.locator('#spin').click();
        // await newTab.getByText('submit', {exact: true}).click();

    
    await newTab.getByText('Result', {exact: true}).click();
    await newTab.getByText('Responses', {exact:true}).click();
    await newTab.getByText('menu', {exact: true}).click();

  }
}


