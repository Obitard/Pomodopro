// Import de React pour utiliser JSX
import React from 'react';

// Import du fichier CSS spécifique à la sidebar (barre latérale)
import '../../styles/sidebar.css';

// Composant fonctionnel Sidebar, avec des props pour gérer l'affichage de la file
export default function Sidebar({ showQueue, setShowQueue }) {
  return (
    // Élément <aside> pour la barre latérale
    <aside className="sidebar">
      <nav className="menu">
        {/* Bouton pour afficher ou masquer la file d'attente */}
        <button onClick={() => setShowQueue((prev) => !prev)}>
          {showQueue ? 'Masquer la file' : 'Afficher la file'}
        </button>

        {/* Bouton Profil désactivé pour l’instant (sera actif quand l’utilisateur sera connecté) */}
        <button disabled>Profil</button>

        {/* Tu pourras ajouter d'autres boutons ici plus tard (paramètres, historique, etc.) */}
      </nav>
    </aside>
  );
}
