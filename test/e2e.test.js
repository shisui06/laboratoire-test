
const { test, expect } = require('@playwright/test');

test('add task via form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#taskTitle', 'New Task');
  await page.click('button[type="submit"]');
  const task = await page.textContent('.task-list');
  expect(task).toContain('New Task');
});
