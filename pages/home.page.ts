import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly tosCheckbox: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
        this.emailInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
        this.tosCheckbox = page.locator('#ctl00_MainContent_SignupControl1_CheckBoxTerms');
        this.signUpButton = page.locator('#ctl00_MainContent_SignupControl1_ButtonSignup');
    }

    async goto() {
        await this.page.goto('https://todo.ly/');
    }

    async registerUser(fullName: string, email: string, password: string) {
        await this.fullNameInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.tosCheckbox.check();
        await this.signUpButton.click();
    }
}
