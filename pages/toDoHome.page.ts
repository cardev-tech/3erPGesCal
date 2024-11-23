import { expect, Locator, Page } from '@playwright/test';

export class ToDoHomePage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly signUpFreeButton: Locator;
    readonly signUpDialog: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly tosCheckbox: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpFreeButton = page.locator('.HPHeaderSignup > a:nth-child(1)');
        this.signUpDialog = page.locator('.HPsignupDiv');
        this.fullNameInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
        this.emailInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
        this.tosCheckbox = page.locator('#ctl00_MainContent_SignupControl1_CheckBoxTerms');
        this.signUpButton = page.locator('#ctl00_MainContent_SignupControl1_ButtonSignup');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async quickCreateNewUser(fullName: string, email: string, password = "InsecurePwd") {
        await this.signUpFreeButton.waitFor({ state: 'visible' });
        await this.signUpFreeButton.click();
        await this.fullNameInput.waitFor({ state: 'visible' });
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.tosCheckbox.check();
        await this.signUpButton.click();
        await expect(this.page.getByText('Logout')).toBeVisible();
    }
}
