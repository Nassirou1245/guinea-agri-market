import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function Annonces({ onRetour }) {
  const [annonces, setAnnonces] = useState([])
  const [chargement, setChargement] = useState(true)
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)
  const [recherche, setRecherche] = useState('')
  const [filtreCategorie, setFiltreCategorie] = useState('')
  const [filtreRegion, setFiltreRegion] = useState('')
  const [succes, setSucces] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  const [form, setForm] = useState({
    produit: '', categorie: '', quantite: '', unite: 'kg',
    prix: '', description: '', region: '', prefecture: '',
    telephone: '', whatsapp: '', nom_vendeur: '', type_vente: 'B2C',
  })

  const produits = [
    { nom: '🌾 Riz', categorie: 'Céréales' },
    { nom: '🌽 Maïs', categorie: 'Céréales' },
    { nom: '🥜 Arachide', categorie: 'Céréales' },
    { nom: '🌾 Fonio', categorie: 'Céréales' },
    { nom: '🥔 Manioc', categorie: 'Légumes' },
    { nom: '🥔 Pomme de terre', categorie: 'Légumes' },
    { nom: '🍅 Tomate', categorie: 'Légumes' },
    { nom: '🧅 Oignon', categorie: 'Légumes' },
    { nom: '🌶️ Piment', categorie: 'Légumes' },
    { nom: '🍌 Banane', categorie: 'Fruits' },
    { nom: '🥭 Mangue', categorie: 'Fruits' },
    { nom: '🍍 Ananas', categorie: 'Fruits' },
    { nom: '☕ Café', categorie: 'Export' },
    { nom: '🍫 Cacao', categorie: 'Export' },
    { nom: '🌴 Huile de palme', categorie: 'Export' },
    { nom: '🌰 Anacarde', categorie: 'Export' },
  ]

  const regions = [
    'Conakry', 'Kindia', 'Labé', 'Mamou',
    'Kankan', 'Faranah', "N'Zérékoré", 'Boké'
  ]

  useEffect(() => { chargerAnnonces() }, [])

  const chargerAnnonces = async () => {
    setChargement(true)
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setAnnonces(data || [])
    setChargement(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const uploadPhoto = async (fichier) => {
    const nomFichier = `${Date.now()}-${fichier.name}`
    const { data, error } = await supabase.storage
      .from('photos-annonces')
      .upload(nomFichier, fichier)
    if (error) return null
    const { data: urlData } = supabase.storage
      .from('photos-annonces')
      .getPublicUrl(nomFichier)
    return urlData.publicUrl
  }

  const publierAnnonce = async () => {
    if (!form.produit || !form.quantite || !form.prix || !form.region || !form.telephone || !form.nom_vendeur) {
      alert('Veuillez remplir tous les champs obligatoires *')
      return
    }
    let photoUrl = null
    if (photo) {
      photoUrl = await uploadPhoto(photo)
    }
    const { error } = await supabase.from('annonces').insert([{
      produit: form.produit,
      categorie: form.categorie,
      quantite: form.quantite,
      unite: form.unite,
      prix: form.prix,
      description: form.description,
      region: form.region,
      prefecture: form.prefecture,
      telephone: form.telephone,
      whatsapp: form.whatsapp || form.telephone,
      nom_vendeur: form.nom_vendeur,
      type_vente: form.type_vente,
      statut: 'Disponible',
      photo_url: photoUrl,
    }])
    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      setSucces(true)
      setAfficherFormulaire(false)
      setPhoto(null)
      setPhotoPreview(null)
      setForm({ produit: '', categorie: '', quantite: '', unite: 'kg', prix: '', description: '', region: '', prefecture: '', telephone: '', whatsapp: '', nom_vendeur: '', type_vente: 'B2C' })
      chargerAnnonces()
      setTimeout(() => setSucces(false), 3000)
    }
  }

  const annoncesFiltrees = annonces.filter(a => {
    const matchRecherche = !recherche ||
      a.produit?.toLowerCase().includes(recherche.toLowerCase()) ||
      a.nom_vendeur?.toLowerCase().includes(recherche.toLowerCase())
    const matchCategorie = !filtreCategorie || a.categorie === filtreCategorie
    const matchRegion = !filtreRegion || a.region === filtreRegion
    return matchRecherche && matchCategorie && matchRegion
  })

  const input = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', marginTop: '0.25rem', boxSizing: 'border-box' }
  const label = { display: 'block', color: '#1B5E20', fontWeight: 'bold', marginTop: '1rem' }

  return (
    <div style={{ fontFamily: 'Arial', margin: 0, background: '#F5F5F5', minHeight: '100vh' }}>

      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => setAfficherFormulaire(true)}
            style={{ background: 'white', color: '#1B5E20', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Publier une annonce
          </button>
          <button onClick={onRetour}
            style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            ← Accueil
          </button>
        </div>
      </header>

      {succes && (
        <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', padding: '1rem 2rem', textAlign: 'center', color: '#1B5E20', fontWeight: 'bold' }}>
          🎉 Annonce publiée avec succès !
        </div>
      )}

      {afficherFormulaire && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, overflowY: 'auto' }}>
          <div style={{ maxWidth: '600px', margin: '2rem auto', background: 'white', borderRadius: '12px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#1B5E20', margin: 0 }}>📢 Publier une annonce</h2>
              <button onClick={() => setAfficherFormulaire(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>✕</button>
            </div>

            <label style={label}>Vendeur (nom complet) *</label>
            <input style={input} name="nom_vendeur" value={form.nom_vendeur} onChange={handleChange} placeholder="Ex: Mamadou Diallo" />

            <label style={label}>Produit *</label>
            <select style={input} name="produit" value={form.produit} onChange={(e) => {
              const selected = produits.find(p => p.nom === e.target.value)
              setForm(prev => ({ ...prev, produit: e.target.value, categorie: selected?.categorie || '' }))
            }}>
              <option value="">-- Choisir un produit --</option>
              {produits.map(p => <option key={p.nom} value={p.nom}>{p.nom}</option>)}
            </select>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={label}>Quantité *</label>
                <input style={input} name="quantite" value={form.quantite} onChange={handleChange} placeholder="Ex: 500" type="number" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Unité</label>
                <select style={input} name="unite" value={form.unite} onChange={handleChange}>
                  <option value="kg">kg</option>
                  <option value="tonne">tonne</option>
                  <option value="sac">sac</option>
                  <option value="caisse">caisse</option>
                  <option value="botte">botte</option>
                </select>
              </div>
            </div>

            <label style={label}>Prix (GNF par unité) *</label>
            <input style={input} name="prix" value={form.prix} onChange={handleChange} placeholder="Ex: 8000" type="number" />

            <label style={label}>Type de vente</label>
            <select style={input} name="type_vente" value={form.type_vente} onChange={handleChange}>
              <option value="B2C">Vente au détail (B2C)</option>
              <option value="B2B">Vente en gros (B2B)</option>
              <option value="Mixte">Mixte (B2B & B2C)</option>
            </select>

            <label style={label}>Région *</label>
            <select style={input} name="region" value={form.region} onChange={handleChange}>
              <option value="">-- Choisir une région --</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label style={label}>Préfecture</label>
            <input style={input} name="prefecture" value={form.prefecture} onChange={handleChange} placeholder="Ex: Labé" />

            <label style={label}>Téléphone *</label>
            <input style={input} name="telephone" value={form.telephone} onChange={handleChange} placeholder="Ex: 620 00 00 00" />

            <label style={label}>WhatsApp</label>
            <input style={input} name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Si différent du téléphone" />

            <label style={label}>Photo du produit 📸</label>
            {photoPreview && (
              <img src={photoPreview} alt="Aperçu" style={{ width: '100%', borderRadius: '8px', marginTop: '0.5rem', maxHeight: '200px', objectFit: 'cover' }} />
            )}
            <input type="file" accept="image/*" onChange={(e) => {
              const fichier = e.target.files[0]
              if (fichier) {
                setPhoto(fichier)
                setPhotoPreview(URL.createObjectURL(fichier))
              }
            }} style={{ ...input, padding: '0.5rem' }} />

            <label style={label}>Description</label>
            <textarea style={{ ...input, minHeight: '80px', resize: 'vertical' }} name="description" value={form.description} onChange={handleChange} placeholder="Qualité, variété, conditions..." />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setAfficherFormulaire(false)}
                style={{ flex: 1, background: '#E0E0E0', color: '#333', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={publierAnnonce}
                style={{ flex: 2, background: '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                📢 Publier l'annonce
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>

        <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input placeholder="🔍 Rechercher un produit ou vendeur..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            style={{ flex: 2, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '200px' }} />
          <select value={filtreCategorie} onChange={e => setFiltreCategorie(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '150px' }}>
            <option value="">Toutes catégories</option>
            <option value="Céréales">Céréales</option>
            <option value="Légumes">Légumes</option>
            <option value="Fruits">Fruits</option>
            <option value="Export">Export</option>
          </select>
          <select value={filtreRegion} onChange={e => setFiltreRegion(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '150px' }}>
            <option value="">Toutes régions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {chargement ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>⏳ Chargement des annonces...</div>
        ) : annoncesFiltrees.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', color: '#666' }}>
            <p style={{ fontSize: '3rem' }}>📭</p>
            <p>Aucune annonce disponible</p>
            <button onClick={() => setAfficherFormulaire(true)}
              style={{ background: '#1B5E20', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
              + Publier la première annonce
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {annoncesFiltrees.map(a => (
              <div key={a.id} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #E8F5E9' }}>
                {a.photo_url && (
                  <img src={a.photo_url} alt={a.produit} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#1B5E20', margin: 0, fontSize: '1.2rem' }}>{a.produit}</h3>
                  <span style={{ background: '#E8F5E9', color: '#1B5E20', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {a.statut}
                  </span>
                </div>
                <div style={{ color: '#E65100', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {parseInt(a.prix).toLocaleString()} GNF/{a.unite}
                </div>
                <div style={{ color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📦 {a.quantite} {a.unite} disponibles</div>
                <div style={{ color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📍 {a.region} {a.prefecture ? `— ${a.prefecture}` : ''}</div>
                <div style={{ color: '#555', fontSize: '0.9rem', marginBottom: '0.5rem' }}>🏷️ {a.type_vente}</div>
                {a.description && (
                  <div style={{ color: '#777', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>{a.description}</div>
                )}
                <div style={{ borderTop: '1px solid #E8F5E9', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#1B5E20', marginBottom: '0.5rem' }}>👤 {a.nom_vendeur}</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={`tel:${a.telephone}`}
                      style={{ flex: 1, background: '#E8F5E9', color: '#1B5E20', padding: '0.5rem', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      📞 Appeler
                    </a>
                    <a href={`https://wa.me/${(a.whatsapp || a.telephone).replace(/\s/g, '')}`} target="_blank"
                      style={{ flex: 2, background: '#25D366', color: 'white', padding: '0.5rem', borderRadius: '6px', textDecoration: 'none', textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      📱 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Conakry, Guinée 🇬🇳</p>
      </footer>
    </div>
  )
}

export default Annonces