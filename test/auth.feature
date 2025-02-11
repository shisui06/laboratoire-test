Feature: Authentification des utilisateurs

  Scenario: Inscription avec des informations valides
    Given l'utilisateur fournit un email "test@example.com" et un mot de passe "password123"
    When l'utilisateur soumet le formulaire d'inscription
    Then l'utilisateur est inscrit avec succès

  Scenario: Connexion avec des informations valides
    Given l'utilisateur est inscrit avec l'email "test@example.com" et le mot de passe "password123"
    When l'utilisateur se connecte avec ces informations
    Then l'utilisateur est connecté


Scenario: Un utilisateur ne peut pas supprimer la tâche d’un autre utilisateur
    Given un utilisateur A possède une tâche
    And un utilisateur B est connecté
    When l'utilisateur B tente de supprimer la tâche de l'utilisateur A
    Then une erreur "Action non autorisée" est affichée