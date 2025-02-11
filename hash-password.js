const bcrypt = require('bcrypt');

// 1. Définir le mot de passe en clair
const plainPassword = 'password123'; // Le mot de passe à hacher

// 2. Générer le hash avec bcrypt
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error('Erreur de hachage :', err);
    return;
  }
  
  // 3. Afficher le hash généré
  console.log('------------------------------------------------');
  console.log('Mot de passe en clair :', plainPassword);
  console.log('Mot de passe haché    :', hash);
  console.log('------------------------------------------------');
  
  // 4. Copiez le hash affiché pour le coller dans users.json
});