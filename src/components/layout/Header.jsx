// On importe React pour pouvoir utiliser JSX (structure HTML dans du JS)
import React from 'react';

// On importe le fichier CSS spécifique au Header (pour le style)
import '../../styles/Header.css';

// On définit un composant fonctionnel React nommé "Header"
export default function Header() {
  return (
    // Balise <header> HTML : section d’en-tête du site ou de l’application
    <header className="header">
      {/* Titre principal de l’application, avec une icône de minuterie */}
      <h1 className="logo">⏱ Pomodopro</h1>

      {/* Zone contenant les boutons d’authentification */}
      <div className="auth-buttons">
        {/* Bouton pour se connecter */}
        <button className="auth-button">Connexion</button>

        {/* Bouton pour créer un compte */}
        <button className="auth-button">Inscription</button>
      </div>
    </header>
  );
}
