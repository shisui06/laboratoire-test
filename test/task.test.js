const { test, expect } = require('@playwright/test');

test('Ajouter une tâche via le formulaire', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#taskTitle', 'Nouvelle Tâche');
  await page.click('button[type="submit"]');
  const task = await page.textContent('.task-list');
  expect(task).toContain('Nouvelle Tâche');
});

test('Supprimer une tâche', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#taskTitle', 'Tâche à supprimer');
  await page.click('button[type="submit"]');
  await page.click('.task-item button.delete');
  const task = await page.textContent('.task-list');
  expect(task).not.toContain('Tâche à supprimer');
});