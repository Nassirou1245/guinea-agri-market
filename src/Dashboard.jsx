import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function Dashboard({ onRetour }) {
  const [agriculteurs, setAgriculteurs] = useState([])
  const [chargement, setChargement] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [filtreRegion, setFiltreRegion] = useState('')

  useEffect(() => {
    chargerAgriculteurs()
  }, [])

  const chargerAgriculteurs = async () => {
    setChargement(true)
    const { data, error } = await supabase
      .from('agriculteurs')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setAgriculteurs(data)
    setChargement(false)
  }

  const agriculteursFiltres = agriculteurs.filter(a => {
    const matchRecherche = 
      (a.nom?.toLowerCase().includes(recherche.toLowerCase())) ||
      (a.prenom?.toLowerCase().includes(recherche.toLowerCase())) ||
      (a.telephone?.includes(recherche)) ||
      (a.cultures?.toLowerCase().includes(recherche.toLowerCase()))
    const matchRegion = filtreRegion === '' || a.region === filtreRegion
    return matchRecherche && matchRegion
  })

  const regions = [...new Set(agriculteurs.map(a => a.region).filter(Boolean))]

  const stats = {
    total: agriculteurs.length,
    producteurs: agriculteurs.filter(a => a.type_utilisateur?.includes('Producteur')).length,
    cooperatives: agriculteurs.filter(a => a.type_utilisateur?.includes('Coopérative')).length,
    acheteurs: agriculteurs.filter(a => 
      a.type_utilisateur?.includes('Grossiste') || 
      a.type_utilisateur?.includes('Consommateur') ||
      a.type_utilisateur?.includes('Restaurant') ||
      a.type_utilisateur?.includes('Exportateur')
    ).length,
  }

  return (
    <div style={{ fontFamily: 'Arial', margin: 0, background: '#F5F5F5', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET — Admin</h1>
        <button onClick={onRetour} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
          ← Accueil
        </button>
      </header>

      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>

        {/* STATS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total inscrits', valeur: stats.total, emoji: '👥', couleur: '#1B5E20' },
            { label: 'Producteurs', valeur: stats.producteurs, emoji: '👨‍🌾', couleur: '#2E7D32' },
            { label: 'Coopératives', valeur: stats.cooperatives, emoji: '🤝', couleur: '#388E3C' },
            { label: 'Acheteurs', valeur: stats.acheteurs, emoji: '🛒', couleur: '#43A047' },
          ].map(s => (
            <div key={s.label} style={{ background: s.couleur, color: 'white', padding: '1.5rem', borderRadius: '12px', flex: '1', minWidth: '150px', textAlign: 'center' }}>
              <p style={{ fontSize: '2rem', margin: 0 }}>{s.emoji}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.3rem 0' }}>{s.valeur}</p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#C8E6C9' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* RECHERCHE ET FILTRES */}
        <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            placeholder="🔍 Rechercher par nom, téléphone, culture..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            style={{ flex: 2, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '200px' }}
          />
          <select
            value={filtreRegion}
            onChange={e => setFiltreRegion(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '150px' }}
          >
            <option value="">Toutes les régions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={chargerAgriculteurs}
            style={{ background: '#1B5E20', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
            🔄 Actualiser
          </button>
        </div>

        {/* TABLEAU */}
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1rem 1.5rem', background: '#E8F5E9', borderBottom: '1px solid #C8E6C9' }}>
            <h2 style={{ margin: 0, color: '#1B5E20', fontSize: '1.1rem' }}>
              👨‍🌾 Liste des inscrits ({agriculteursFiltres.length})
            </h2>
          </div>

          {chargement ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
              ⏳ Chargement...
            </div>
          ) : agriculteursFiltres.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
              Aucun résultat trouvé
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F5F5F5' }}>
                    {['Nom & Prénom', 'Téléphone', 'Type', 'Région', 'Préfecture', 'Cultures', 'Date'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#1B5E20', fontSize: '0.85rem', fontWeight: 'bold', borderBottom: '1px solid #E0E0E0' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agriculteursFiltres.map((a, i) => (
                    <tr key={a.id} style={{ background: i % 2 === 0 ? 'white' : '#F9FBE7', borderBottom: '1px solid #F0F0F0' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#1B5E20' }}>
                        {a.prenom} {a.nom}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <a href={`tel:${a.telephone}`} style={{ color: '#1B5E20', textDecoration: 'none' }}>
                          📞 {a.telephone}
                        </a>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{a.type_utilisateur}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{a.region}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{a.prefecture}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#555', maxWidth: '200px' }}>
                        {a.cultures}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#888' }}>
                        {new Date(a.created_at).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Dashboard Admin 🇬🇳</p>
      </footer>
    </div>
  )
}

export default Dashboard