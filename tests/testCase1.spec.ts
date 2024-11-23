import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../utils/generateRandomEmail';
import { getOneMonthFromToday, formatDateToYYYYMMDD } from '../utils/dateUtils';

test('Flujo completo: registro, creación de tarea con due date y eliminación del primer ítem', async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    const projectsPage = new ProjectsPage(page);

    // Paso 1: Registro de usuario
    const email = generateRandomEmail();
    const password = 'TestPassword123';
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser('Test User', email, password);

    // Validar redirección
    await expect(page).toHaveURL(/.*todo.ly/);

    // Paso 2: Crear una nueva tarea
    const todoContent = 'Test Task';
    await projectsPage.createNewTodoItem(todoContent);

    // Validar que la tarea fue creada
    await expect(projectsPage.newTodoItemLI).toHaveText(todoContent);

    // Paso 3: Asignar fecha de entrega
    await projectsPage.setDateAtNewTodoItem();

    // Paso 4: Eliminar el primer ítem
    await projectsPage.deleteFirstTodoItem();
});
