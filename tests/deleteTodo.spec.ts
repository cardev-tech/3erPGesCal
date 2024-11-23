import { test } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../utils/generateRandomEmail';

test('Eliminar una tarea', async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    const projectsPage = new ProjectsPage(page);

    const email = generateRandomEmail();
    const taskContent = 'Tarea para Eliminar';

    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser('Usuario de Prueba', email, '1234');
    await projectsPage.createNewTodoItem(taskContent);
    await projectsPage.deleteFirstTodoItem();

});
