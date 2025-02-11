const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname, '../src/data/users.json');
const bcrypt = require('bcrypt');

// Create file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

// Lire la base de données des utilisateurs
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

// Déclaration et initialisation de la variable users
let users = readUsers();

// Écrire dans la base de données des utilisateurs
const writeUsers = (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));

// Fonction pour l'inscription
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: 'Email ou mot de passe invalide' });
  }

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Cet email est déjà utilisé' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  writeUsers(users);

  res.status(200).json({ message: 'Inscription réussie' });
});

// Fonction pour la connexion
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers(); // Read users from the file

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Utilisateur non trouvé' });
  }

  // Compare hashed passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    res.status(200).json({ message: 'Utilisateur connecté' });
  });
});

// Fonction pour ajouter un utilisateur
const addUser = async (res) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  writeUsers(users);

  // Ajouter un message de succès en utilisant res
  res.json({ message: 'Inscription réussie' });
};

module.exports = router;
