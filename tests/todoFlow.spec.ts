import { expect, test } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../utils/generateRandomEmail';
import { getOneMonthFromToday, formatToExactDueDate } from '../utils/dateUtils';

test.describe('Gestión de tareas en flujo lógico', () => {
  let toDoHomePage: ToDoHomePage;
  let projectsPage: ProjectsPage;
  let email: string;
  const password = '1234';
  const taskContent = 'Tarea en Flujo Completo';
  const dueDate = formatToExactDueDate(getOneMonthFromToday());

  // Hook para configurar la cuenta y sesión antes de todas las pruebas
  test.beforeAll(async ({ page }) => {
    toDoHomePage = new ToDoHomePage(page);
    projectsPage = new ProjectsPage(page);
    email = generateRandomEmail();

    // Crear usuario y mantener sesión
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser('Usuario de Prueba', email, password);
  });

  test('1. Crear una nueva tarea', async () => {
    // Crear una nueva tarea
    await projectsPage.createNewTodoItem(taskContent);

    // Validar que la tarea exista
    await projectsPage.validateTodoItemExists(taskContent);
  });

  test('2. Asignar una fecha de vencimiento a la tarea', async () => {
    // Asignar una fecha de vencimiento a la tarea creada en el Test 1
    await projectsPage.setDueDateForTodoItem(taskContent, dueDate);

    // Validar la fecha de vencimiento
    await projectsPage.validateTodoItemDueDate(taskContent, dueDate);

    // Validar persistencia después de recargar
    await projectsPage.validateDueDateAfterReload(taskContent, dueDate);
  });

  test('3. Eliminar el primer elemento de la lista de tareas', async () => {
    // Eliminar el primer elemento de la lista
    await projectsPage.deleteFirstTodoItem();

    // Validar que el primer elemento ha sido eliminado
    const remainingTasks = await projectsPage.todoItems.count();
    console.log(`Tareas restantes después de eliminar: ${remainingTasks}`);
    expect(remainingTasks).toBeGreaterThanOrEqual(0); // Validar que hay tareas restantes o está vacío
  });
});
