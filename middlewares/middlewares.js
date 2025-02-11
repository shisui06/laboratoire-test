module.exports = (req, res, next) => {
 
 const authHeader = req.headers['authorization'];

 if (!authHeader) {
   return res.status(403).json({ message: 'Clé basique manquante' });
 }

 
 const auth = authHeader.split(' ');

 if (auth[0] !== 'Basic' || auth.length !== 2) {
   return res.status(403).json({ message: 'Clé basique invalide' });
 }

 
 const apiKey = auth[1];


 const validApiKey = 'ma_clé_secrète';

 if (apiKey !== validApiKey) {
   return res.status(403).json({ message: 'Clé basique incorrecte' });
 }


 next();
};
