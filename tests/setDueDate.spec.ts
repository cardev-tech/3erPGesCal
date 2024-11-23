import { test } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import { getOneMonthFromToday, formatToExactDueDate } from '../utils/dateUtils';
import generateRandomEmail from '../utils/generateRandomEmail';

test('Asignar fecha de vencimiento', async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    const projectsPage = new ProjectsPage(page);

    const email = generateRandomEmail();
    const taskContent = 'Nueva Tarea con Fecha';
    const dueDate = formatToExactDueDate(getOneMonthFromToday());

    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser('Usuario de Prueba', email, '1234');
    await projectsPage.createNewTodoItem(taskContent);
    await projectsPage.setDueDateForTodoItem(taskContent, dueDate);
});
