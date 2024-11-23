import { expect, Locator, Page } from '@playwright/test';

export class ProjectsPage {
    readonly page: Page;
    readonly addNewTodoTextArea: Locator;
    readonly todoItems: Locator;
    readonly dueDateInputTextBox: Locator;
    readonly loader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addNewTodoTextArea = page.locator('#NewItemContentInput');
        this.todoItems = page.locator('#mainItemList > li');
        this.dueDateInputTextBox = page.locator('#EditDueDateAdvDate').last();
        this.loader = page.locator('#LoaderImg');
    }

    async createNewTodoItem(content: string) {
        await this.addNewTodoTextArea.waitFor({ state: 'visible' });
        await this.addNewTodoTextArea.fill(content);
        await this.page.keyboard.press('Enter');
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.todoItems.last()).toHaveText(content);
    }

    async setDueDateForTodoItem(content: string, dueDate: string) {
        const item = this.todoItems.filter({ hasText: content });
        await item.hover();
        await item.locator('.ItemDueDate').click(); // Abrir el calendario
        await this.dueDateInputTextBox.waitFor({ state: 'visible' });
    
        // Rellenar la fecha
        await this.dueDateInputTextBox.fill(dueDate);
    
        // Confirmar la fecha presionando Enter
        await this.dueDateInputTextBox.press('Enter');
    
        // Esperar que el loader desaparezca
        await this.loader.waitFor({ state: 'hidden' });
    
        // Validar que la fecha aparece configurada
        const dueDateText = await item.locator('.ItemDueDate').textContent();
        expect(dueDateText?.trim()).toBe(dueDate);
    }
    
    
    
    

    async deleteFirstTodoItem() {
        const firstItem = this.todoItems.first(); // Seleccionar la primera tarea
        await firstItem.hover();
        await firstItem.locator('.ItemMenu').click();
        await this.page.locator('#itemContextMenu > li.delete.separator > a').click();
        await this.loader.waitFor({ state: 'hidden' });
        
    }
    

    // Método para validar que un elemento existe
    async validateTodoItemExists(content: string) {
        const item = this.todoItems.filter({ hasText: content });
        await expect(item).toBeVisible();
    }

    // Método para validar la fecha de vencimiento de una tarea
    async validateTodoItemDueDate(content: string, dueDate: string) {
        const item = this.todoItems.filter({ hasText: content });
        const dueDateText = await item.locator('.ItemDueDate').textContent();
        expect(dueDateText?.trim()).toBe(dueDate);
    }

    async validateDueDateAfterReload(content: string, dueDate: string) {
        // Recargar la página
        await this.page.reload();
    
        // Validar que la tarea tenga la fecha configurada
        const item = this.todoItems.filter({ hasText: content });
        const dueDateText = await item.locator('.ItemDueDate').textContent();
        expect(dueDateText?.trim()).toBe(dueDate);
    }
    
}
