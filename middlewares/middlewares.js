module.exports = (req, res, next) => {
 // Récupérer la clé d'authentification dans l'en-tête Authorization
 const authHeader = req.headers['authorization'];

 if (!authHeader) {
   return res.status(403).json({ message: 'Clé basique manquante' });
 }

 // Vérifier que l'en-tête commence par 'Basic '
 const auth = authHeader.split(' ');

 if (auth[0] !== 'Basic' || auth.length !== 2) {
   return res.status(403).json({ message: 'Clé basique invalide' });
 }

 // Comparer la clé avec la clé secrète attendue
 const apiKey = auth[1];

 // Exemple de clé basique que tu peux valider (à remplacer par ta propre clé)
 const validApiKey = 'ma_clé_secrète';

 if (apiKey !== validApiKey) {
   return res.status(403).json({ message: 'Clé basique incorrecte' });
 }

 // Si tout est valide, on passe à la prochaine étape
 next();
};
