
const validateEmail = require('../validation/email');
const validatePassword = require('../validation/password');

describe('Validation des entrées utilisateur', () => {
  describe('Validation de l\'email', () => {
    it('devrait valider un email valide', () => {
      const email = 'test@example.com';
      expect(validateEmail(email)).toBe(true);
    });

    it('devrait refuser un email invalide', () => {
      const email = 'test';
      expect(validateEmail(email)).toBe(false);
    });
  });
  
  describe('Validation du mot de passe', () => {
    it('devrait valider un mot de passe valide', () => {
      const password = 'password123';
      expect(validatePassword(password)).toBe(true);
    });

    it('devrait refuser un mot de passe trop court', () => {
      const password = 'short';
      expect(validatePassword(password)).toBe(false);
    });

    
  });
});
