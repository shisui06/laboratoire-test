const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const TASKS_FILE = "./tasks.json";
const USERS_FILE = "./users.json";

// Lire les tâches
const readTasks = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/tasks.json'), "utf8"));

// Écrire dans le fichier des tâches
const writeTasks = (data) => fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2));

// Lire les utilisateurs
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

// Ajouter une tâche
router.post("/tasks", (req, res) => {
    const { username, task } = req.body;
    const users = readUsers();
    const tasks = readTasks();

    if (!users.users.some(user => user.username === username)) {
        return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const newTask = { id: Date.now(), username, task };
    tasks.tasks.push(newTask);
    writeTasks(tasks);

    res.json({ message: "Tâche ajoutée", task: newTask });
});

// Consulter les tâches d'un utilisateur
router.get("/tasks", (req, res) => {
    const { email } = req.query;
    const tasks = readTasks();

    const userTasks = tasks.filter(task => task.userId === email);
    res.json(userTasks);
});

// Supprimer une tâche
router.delete("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);

    const initialLength = tasks.tasks.length;
    tasks.tasks = tasks.tasks.filter(task => task.id !== taskId);

    if (tasks.tasks.length === initialLength) {
        return res.status(404).json({ message: "Tâche non trouvée" });
    }

    writeTasks(tasks);
    res.json({ message: "Tâche supprimée" });
});

const generateBasicKey = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    for (let i = 0; i < 10; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return key;
};

const basicKey = generateBasicKey();
console.log(basicKey);

module.exports = router;
