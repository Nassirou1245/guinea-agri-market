import { useState } from 'react'
import Inscription from './Inscription'
import Dashboard from './Dashboard'
import Annonces from './Annonces'

function App() {
  const [page, setPage] = useState('accueil')

  const categories = [
    {
      titre: '🌾 Céréales & Légumineuses',
      couleur: '#E8F5E9',
      bordure: '#A5D6A7',
      produits: [
        { emoji: '🌾', nom: 'Riz' },
        { emoji: '🌽', nom: 'Maïs' },
        { emoji: '🥜', nom: 'Arachide' },
        { emoji: '🌾', nom: 'Fonio' },
      ]
    },
    {
      titre: '🥔 Tubercules & Légumes',
      couleur: '#FFF8E1',
      bordure: '#FFE082',
      produits: [
        { emoji: '🥔', nom: 'Manioc' },
        { emoji: '🥔', nom: 'Pomme de terre' },
        { emoji: '🍅', nom: 'Tomate' },
        { emoji: '🧅', nom: 'Oignon' },
        { emoji: '🌶️', nom: 'Piment' },
      ]
    },
    {
      titre: '🍌 Fruits',
      couleur: '#FFF3E0',
      bordure: '#FFCC80',
      produits: [
        { emoji: '🍌', nom: 'Banane' },
        { emoji: '🥭', nom: 'Mangue' },
        { emoji: '🍍', nom: 'Ananas' },
      ]
    },
    {
      titre: '☕ Cultures d\'Export',
      couleur: '#F3E5F5',
      bordure: '#CE93D8',
      produits: [
        { emoji: '☕', nom: 'Café' },
        { emoji: '🍫', nom: 'Cacao' },
        { emoji: '🌴', nom: 'Huile de palme' },
        { emoji: '🌰', nom: 'Anacarde' },
      ]
    },
  ]

  const chiffres = [
    { nombre: '10 000+', label: 'Agriculteurs', emoji: '👨‍🌾' },
    { nombre: '6', label: 'Régions couvertes', emoji: '🗺️' },
    { nombre: '16', label: 'Produits agricoles', emoji: '🌾' },
    { nombre: '500+', label: 'Acheteurs actifs', emoji: '🤝' },
  ]

  const etapes = [
    { numero: '1', titre: 'Créez votre profil', description: 'Inscrivez-vous gratuitement et publiez vos récoltes disponibles avec photos et prix.', emoji: '📝' },
    { numero: '2', titre: 'Connectez-vous', description: 'Les acheteurs vous trouvent et vous contactent directement via WhatsApp ou téléphone.', emoji: '📱' },
    { numero: '3', titre: 'Vendez au meilleur prix', description: 'Négociez directement sans intermédiaire et recevez votre paiement en toute sécurité.', emoji: '💰' },
  ]

  if (page === 'inscription') return <Inscription onRetour={() => setPage('accueil')} />
  if (page === 'dashboard') return <Dashboard onRetour={() => setPage('accueil')} />
  if (page === 'annonces') return <Annonces onRetour={() => setPage('accueil')} />

  return (
    <div style={{ fontFamily: 'Arial', margin: 0 }}>

      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET</h1>
        <nav>
          <a href="#" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Accueil</a>
          <a href="#" onClick={() => setPage('annonces')} style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none', cursor: 'pointer' }}>Produits</a>
          <a href="#" onClick={() => setPage('inscription')} style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none', cursor: 'pointer' }}>Agriculteurs</a>
          <a href="#" onClick={() => setPage('dashboard')} style={{ color: '#A5D6A7', marginLeft: '1rem', textDecoration: 'none', cursor: 'pointer' }}>🔐 Admin</a>
        </nav>
      </header>

      <section style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2.8rem', marginBottom: '1rem' }}>
          🌾 La plateforme agricole numérique de Guinée
        </h2>
        <p style={{ color: '#C8E6C9', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Connecter les producteurs, développer l'agriculture, nourrir l'avenir.
        </p>
        <button onClick={() => setPage('inscription')} style={{ background: 'white', color: '#1B5E20', padding: '1rem 2.5rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginRight: '1rem' }}>
          S'inscrire comme agriculteur
        </button>
        <button onClick={() => setPage('annonces')} style={{ background: 'transparent', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', border: '2px solid white', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Voir les produits
        </button>
      </section>

      <section style={{ background: '#1B5E20', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {chiffres.map(c => (
            <div key={c.label} style={{ textAlign: 'center', color: 'white', minWidth: '150px' }}>
              <p style={{ fontSize: '2.5rem', margin: 0 }}>{c.emoji}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.3rem 0', color: '#A5D6A7' }}>{c.nombre}</p>
              <p style={{ margin: 0, color: '#C8E6C9', fontSize: '0.95rem' }}>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: 'white', textAlign: 'center' }}>
        <h2 style={{ color: '#1B5E20', fontSize: '2rem', marginBottom: '0.5rem' }}>Comment ça marche ?</h2>
        <p style={{ color: '#666', marginBottom: '3rem' }}>Simple, rapide et gratuit pour les agriculteurs</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {etapes.map(e => (
            <div key={e.numero} style={{ background: '#F5F5F5', padding: '2rem', borderRadius: '12px', maxWidth: '250px', textAlign: 'center', border: '2px solid #E8F5E9' }}>
              <div style={{ background: '#1B5E20', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {e.numero}
              </div>
              <p style={{ fontSize: '2.5rem', margin: '0 0 0.5rem' }}>{e.emoji}</p>
              <h3 style={{ color: '#1B5E20', margin: '0 0 0.5rem' }}>{e.titre}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: '#F5F5F5', textAlign: 'center' }}>
        <h2 style={{ color: '#1B5E20', marginBottom: '0.5rem', fontSize: '2rem' }}>Nos produits agricoles</h2>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Achetez directement auprès des producteurs guinéens</p>
        {categories.map(cat => (
          <div key={cat.titre} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-block', background: '#1B5E20', color: 'white', padding: '0.4rem 1.5rem', borderRadius: '20px', marginBottom: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>
              {cat.titre}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              {cat.produits.map(produit => (
                <div key={produit.nom} style={{ background: cat.couleur, padding: '1.2rem 1.5rem', borderRadius: '12px', minWidth: '110px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', border: `2px solid ${cat.bordure}` }}>
                  <p style={{ fontSize: '2.5rem', margin: 0 }}>{produit.emoji}</p>
                  <p style={{ color: '#1B5E20', fontWeight: 'bold', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>{produit.nom}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ background: '#2E7D32', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
          🌿 Rejoignez Guinea Agri Market aujourd'hui !
        </h2>
        <p style={{ color: '#C8E6C9', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Plus de 10 000 agriculteurs vous attendent sur la plateforme
        </p>
        <button onClick={() => setPage('inscription')} style={{ background: 'white', color: '#1B5E20', padding: '1rem 3rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          S'inscrire gratuitement
        </button>
      </section>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Conakry, Guinée 🇬🇳</p>
        <p style={{ margin: '0.5rem 0 0', color: '#C8E6C9', fontSize: '0.9rem' }}>
          Connecter les producteurs, développer l'agriculture, nourrir l'avenir.
        </p>
      </footer>
    </div>
  )
}

export default App