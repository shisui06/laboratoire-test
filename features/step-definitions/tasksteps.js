const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('que l\'utilisateur est connecté', function () {
  // Simuler la connexion
  this.user = { email: 'user@example.com' };
});

When('l\'utilisateur ajoute une tâche avec le titre {string}', function (title) {
  this.task = { title, userId: this.user.email };
  // Simuler l'ajout de la tâche
  this.tasks = this.tasks || [];
  this.tasks.push(this.task);
});

Then('la tâche {string} devrait apparaître dans la liste', function (title) {
  const task = this.tasks.find(t => t.title === title);
  assert(task, `La tâche "${title}" n'a pas été trouvée`);
});

Given('que l\'utilisateur a une tâche {string}', function (title) {
  this.tasks = [{ id: 1, userId: this.user.email, title }];
});

When('l\'utilisateur supprime la tâche {string}', function (title) {
  const task = this.tasks.find(t => t.title === title);
  this.tasks = this.tasks.filter(t => t.id !== task.id);
});

Then('la tâche {string} ne devrait plus apparaître dans la liste', function (title) {
  const task = this.tasks.find(t => t.title === title);
  assert(!task, `La tâche "${title}" est toujours présente`);
});

Given('que l\'utilisateur A a une tâche {string}', function (title) {
  this.tasks = [{ id: 1, userId: 'userA@example.com', title }];
});

Given('que l\'utilisateur B est connecté', function () {
  this.user = { email: 'userB@example.com' };
});

When('l\'utilisateur B essaie de supprimer la tâche {string}', function (title) {
  const task = this.tasks.find(t => t.title === title);
  this.error = null;
  try {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  } catch (error) {
    this.error = error;
  }
});

Then('une erreur {string} devrait être affichée', function (errorMessage) {
  assert(this.error, `Aucune erreur n'a été générée`);
  assert(this.error.message.includes(errorMessage), `L'erreur ne correspond pas à "${errorMessage}"`);
});