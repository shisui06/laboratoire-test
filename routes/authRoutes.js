const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname, '../src/data/users.json');
const bcrypt = require('bcrypt');

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}


const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));


let users = readUsers();


const writeUsers = (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));


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


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers(); 

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Utilisateur non trouvé' });
  }

  
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    res.status(200).json({ message: 'Utilisateur connecté' });
  });
});


const addUser = async (res) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  writeUsers(users);

  
  res.json({ message: 'Inscription réussie' });
};

module.exports = router;
