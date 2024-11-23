import { expect, Locator, Page } from '@playwright/test';
import { formatDateToYYYYMMDD, getOneMonthFromToday } from '../utils/dateUtils';

export class ProjectsPage {
    readonly page: Page;
    readonly addNewTodoTextArea: Locator;
    readonly newTodoItemLI: Locator;
    readonly newTodoItemDueDateBox: Locator;
    readonly dueDateInputTextBox: Locator;
    readonly firstTodoItemLI: Locator;
    readonly firstTodoItemMoreOptionsButton: Locator;
    readonly firstTodoItemDeleteButton: Locator;
    readonly loader: Locator;
    readonly messageInfo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewTodoTextArea = page.locator('#NewItemContentInput');
        this.newTodoItemLI = page.locator('#mainItemList > li:last-child');
        this.newTodoItemDueDateBox = page.locator('#mainItemList > li:last-child .ItemDueDate').getByText('Set Due Date');
        this.dueDateInputTextBox = page.locator('#EditDueDateAdvDate').last();
        this.firstTodoItemLI = page.locator('#mainItemList > li:nth-child(1)');
        this.firstTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-child(1) .ItemMenu');
        this.firstTodoItemDeleteButton = page.locator('#itemContextMenu > li.delete.separator > a');
        this.loader = page.locator('#LoaderImg');
        this.messageInfo = page.locator('#HeaderMessageInfo');
    }

    async createNewTodoItem(content: string) {
        await this.addNewTodoTextArea.waitFor({ state: 'visible' });
        await this.addNewTodoTextArea.fill(content);
        await this.page.keyboard.press('Enter');
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.newTodoItemLI).toHaveText(content);
    }

    async setDateAtNewTodoItem() {
        const oneMonthFromToday = getOneMonthFromToday();
        const dueDate = formatDateToYYYYMMDD(oneMonthFromToday);

        await this.newTodoItemLI.hover();
        await this.newTodoItemDueDateBox.click();
        await this.dueDateInputTextBox.waitFor({ state: 'visible' });
        await this.dueDateInputTextBox.fill(dueDate);
        await this.page.keyboard.press('Enter');
        await this.loader.waitFor({ state: 'hidden' });
    }

    async deleteFirstTodoItem() {
        await this.firstTodoItemLI.hover();
        await this.firstTodoItemMoreOptionsButton.click();
        await this.firstTodoItemDeleteButton.click();
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.messageInfo).toHaveText(/.*Item has been Deleted.*/);
    }
}
