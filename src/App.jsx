import { useState } from 'react'
import { supabase } from './supabase'
import { traductions } from './traductions'
import Inscription from './Inscription'
import Dashboard from './Dashboard'
import Annonces from './Annonces'
import Connexion from './Connexion'
import Prix from './Prix'

function App() {
  const [page, setPage] = useState('accueil')
  const [utilisateur, setUtilisateur] = useState(null)
  const [langue, setLangue] = useState('fr')

  const t = traductions[langue]

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
    { nombre: '10 000+', label: t.agriculteurs_stat, emoji: '👨‍🌾' },
    { nombre: '6', label: t.regions_stat, emoji: '🗺️' },
    { nombre: '16', label: t.produits_stat, emoji: '🌾' },
    { nombre: '500+', label: t.acheteurs_stat, emoji: '🤝' },
  ]

  const etapes = [
    { numero: '1', titre: t.etape1_titre, description: t.etape1_desc, emoji: '📝' },
    { numero: '2', titre: t.etape2_titre, description: t.etape2_desc, emoji: '📱' },
    { numero: '3', titre: t.etape3_titre, description: t.etape3_desc, emoji: '💰' },
  ]

  const seDeconnecter = async () => {
    await supabase.auth.signOut()
    setUtilisateur(null)
  }

  if (page === 'connexion') return <Connexion onConnecte={(user) => { setUtilisateur(user); setPage('accueil') }} onRetour={() => setPage('accueil')} />
  if (page === 'inscription') return <Inscription onRetour={() => setPage('accueil')} />
  if (page === 'dashboard') return <Dashboard onRetour={() => setPage('accueil')} />
  if (page === 'annonces') return <Annonces onRetour={() => setPage('accueil')} />
  if (page === 'prix') return <Prix onRetour={() => setPage('accueil')} />

  return (
    <div style={{ fontFamily: 'Arial', margin: 0 }} dir={t.direction}>

      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET</h1>
        <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <select
            value={langue}
            onChange={e => setLangue(e.target.value)}
            style={{ background: '#2E7D32', color: 'white', border: '1px solid #A5D6A7', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            {Object.entries(traductions).map(([code, trad]) => (
              <option key={code} value={code}>{trad.drapeau} {trad.nom}</option>
            ))}
          </select>
          <a href="#" style={{ color: 'white', marginLeft: '0.5rem', textDecoration: 'none' }}>{t.accueil}</a>
          <a href="#" onClick={() => setPage('annonces')} style={{ color: 'white', marginLeft: '0.5rem', textDecoration: 'none', cursor: 'pointer' }}>{t.produits}</a>
          <a href="#" onClick={() => setPage('prix')} style={{ color: 'white', marginLeft: '0.5rem', textDecoration: 'none', cursor: 'pointer' }}>📊 Prix</a>
          <a href="#" onClick={() => setPage('inscription')} style={{ color: 'white', marginLeft: '0.5rem', textDecoration: 'none', cursor: 'pointer' }}>{t.agriculteurs}</a>
          <a href="#" onClick={() => setPage('dashboard')} style={{ color: '#A5D6A7', marginLeft: '0.5rem', textDecoration: 'none', cursor: 'pointer' }}>{t.admin}</a>
          {utilisateur ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
              <span style={{ color: '#A5D6A7', fontSize: '0.85rem' }}>👤 {utilisateur.email}</span>
              <button onClick={seDeconnecter}
                style={{ background: '#E53935', color: 'white', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                {t.deconnexion}
              </button>
            </span>
          ) : (
            <a href="#" onClick={() => setPage('connexion')} style={{ color: 'white', marginLeft: '0.5rem', textDecoration: 'none', cursor: 'pointer', background: '#2E7D32', padding: '0.3rem 0.8rem', borderRadius: '6px' }}>{t.connexion}</a>
          )}
        </nav>
      </header>

      <section style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '2.8rem', marginBottom: '1rem' }}>{t.titre_hero}</h2>
        <p style={{ color: '#C8E6C9', fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>{t.slogan}</p>
        <button onClick={() => setPage('inscription')} style={{ background: 'white', color: '#1B5E20', padding: '1rem 2.5rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginRight: '1rem' }}>
          {t.inscrire_agriculteur}
        </button>
        <button onClick={() => setPage('annonces')} style={{ background: 'transparent', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', border: '2px solid white', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          {t.voir_produits}
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
        <h2 style={{ color: '#1B5E20', fontSize: '2rem', marginBottom: '0.5rem' }}>{t.comment_ca_marche}</h2>
        <p style={{ color: '#666', marginBottom: '3rem' }}>{t.simple_gratuit}</p>
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
        <h2 style={{ color: '#1B5E20', marginBottom: '0.5rem', fontSize: '2rem' }}>{t.nos_produits}</h2>
        <p style={{ color: '#666', marginBottom: '2.5rem' }}>{t.acheter_direct}</p>
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
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>{t.rejoignez}</h2>
        <p style={{ color: '#C8E6C9', fontSize: '1.1rem', marginBottom: '2rem' }}>{t.attendent}</p>
        <button onClick={() => setPage('inscription')} style={{ background: 'white', color: '#1B5E20', padding: '1rem 3rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          {t.inscrire_gratuit}
        </button>
      </section>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Conakry, Guinée 🇬🇳</p>
        <p style={{ margin: '0.5rem 0 0', color: '#C8E6C9', fontSize: '0.9rem' }}>{t.slogan}</p>
      </footer>
    </div>
  )
}

export default App