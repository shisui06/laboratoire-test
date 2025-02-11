const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const TASKS_FILE = path.join(__dirname, '../src/data/tasks.json');
const USERS_FILE = "./users.json";


const readTasks = () => {
  const filePath = path.resolve(__dirname, '../src/data/tasks.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};


const writeTasks = (data) => {
  const filePath = path.resolve(__dirname, '../src/data/tasks.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));


router.post("/tasks", (req, res) => {
    try {
        const { title, description, userId } = req.body;
        
        if (!title || !userId) {
            return res.status(400).json({ error: "Title and userId are required" });
        }

        const tasks = readTasks();
        
        const newTask = {
            id: Date.now(),
            userId,
            title,
            description: description || "No description"
        };

        tasks.push(newTask);
        writeTasks(tasks);

        res.json({ message: "Tâche ajoutée", task: newTask });
    } catch (error) {
        console.error("Error in task creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/tasks", (req, res) => {
    const { email } = req.query;
    const tasks = readTasks();

    const userTasks = tasks.filter(task => task.userId === email);
    res.json(userTasks);
});


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
