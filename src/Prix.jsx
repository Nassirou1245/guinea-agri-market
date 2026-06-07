import { useState, useEffect } from 'react'
import { supabase } from './supabase'

function Prix({ onRetour }) {
  const [prix, setPrix] = useState([])
  const [chargement, setChargement] = useState(true)
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)
  const [recherche, setRecherche] = useState('')
  const [filtreRegion, setFiltreRegion] = useState('')
  const [filtreProduit, setFiltreProduit] = useState('')
  const [succes, setSucces] = useState(false)

  const [form, setForm] = useState({
    produit: '', region: '', prefecture: '',
    sous_prefecture: '', prix: '', unite: 'kg', nom_publieur: ''
  })

  const produits = [
    '🌾 Riz', '🌽 Maïs', '🥜 Arachide', '🌾 Fonio',
    '🥔 Manioc', '🥔 Pomme de terre', '🍅 Tomate', '🧅 Oignon',
    '🌶️ Piment', '🍌 Banane', '🥭 Mangue', '🍍 Ananas',
    '☕ Café', '🍫 Cacao', '🌴 Huile de palme', '🌰 Anacarde'
  ]

  const regions = {
    'Conakry': ['Kaloum', 'Dixinn', 'Matam', 'Matoto', 'Ratoma'],
    'Kindia': ['Kindia', 'Coyah', 'Dubréka', 'Forécariah', 'Télimélé'],
    'Labé': ['Labé', 'Pita', 'Mali', 'Koubia', 'Tougué'],
    'Mamou': ['Mamou', 'Dalaba', 'Pita'],
    'Kankan': ['Kankan', 'Kérouané', 'Kouroussa', 'Mandiana', 'Siguiri'],
    'Faranah': ['Faranah', 'Dabola', 'Dinguiraye', 'Kissidougou'],
    'N\'Zérékoré': ['N\'Zérékoré', 'Beyla', 'Guéckédou', 'Lola', 'Macenta', 'Yomou'],
    'Boké': ['Boké', 'Boffa', 'Fria', 'Gaoual', 'Koundara'],
  }

  const sousPrefectures = {
    'Kaloum': ['Almamya', 'Boulbinet', 'Coronthie', 'Tombo'],
    'Dixinn': ['Bellevue', 'Cameroun', 'Dixinn Centre', 'Landréah'],
    'Matam': ['Bonfi', 'Coléah', 'Matam Centre', 'Port'],
    'Matoto': ['Aware', 'Dabondy', 'Kagbelen', 'Sonfonia'],
    'Ratoma': ['Cimenterie', 'Koloma', 'Lambanyi', 'Nongo'],
    'Kindia': ['Kindia Centre', 'Souguéta', 'Kouria', 'Bangouya'],
    'Coyah': ['Coyah Centre', 'Manéah', 'Wonkifong', 'Ouassou'],
    'Dubréka': ['Dubréka Centre', 'Khorira', 'Tanènè', 'Kouriah'],
    'Forécariah': ['Forécariah Centre', 'Benty', 'Farmoriah', 'Maférénya'],
    'Télimélé': ['Télimélé Centre', 'Daramagnaki', 'Kollet', 'Missira'],
    'Labé': ['Labé Centre', 'Popodara', 'Noussy', 'Kouramangui'],
    'Pita': ['Pita Centre', 'Timbi Madina', 'Timbi Touni', 'Pelel'],
    'Mali': ['Mali Centre', 'Hidayatou', 'Labé Koura', 'Madina Wora'],
    'Koubia': ['Koubia Centre', 'Hidayatou', 'Matakaou', 'Wendou Mbour'],
    'Tougué': ['Tougué Centre', 'Gongoré', 'Kansangui', 'Bourouwal'],
    'Mamou': ['Mamou Centre', 'Porédaka', 'Saramoussaya', 'Konkouré'],
    'Dalaba': ['Dalaba Centre', 'Ditinn', 'Mitty', 'Kaala'],
    'Kankan': ['Kankan Centre', 'Baté Nafadji', 'Missamana', 'Sabadou'],
    'Kérouané': ['Kérouané Centre', 'Banankoro', 'Damaro', 'Sibiribaro'],
    'Kouroussa': ['Kouroussa Centre', 'Doura', 'Sanguiana', 'Cisséla'],
    'Mandiana': ['Mandiana Centre', 'Dialakoro', 'Morodou', 'Kantoumanina'],
    'Siguiri': ['Siguiri Centre', 'Doko', 'Nounkounkan', 'Naboun'],
    'Faranah': ['Faranah Centre', 'Banian', 'Baro', 'Tiro'],
    'Dabola': ['Dabola Centre', 'Arfamoussaya', 'Koba', 'Ndéma'],
    'Dinguiraye': ['Dinguiraye Centre', 'Lansanaya', 'Maleya', 'Dogomet'],
    'Kissidougou': ['Kissidougou Centre', 'Fermessadou', 'Gbangbadou', 'Yendé Millimou'],
    'N\'Zérékoré': ['N\'Zérékoré Centre', 'Gouécké', 'Kobela', 'Zébéla'],
    'Beyla': ['Beyla Centre', 'Sinko', 'Moussadou', 'Diécké'],
    'Guéckédou': ['Guéckédou Centre', 'Bolodou', 'Fangamadou', 'Termenta'],
    'Lola': ['Lola Centre', 'Bossou', 'Nzo', 'Koulé'],
    'Macenta': ['Macenta Centre', 'Sérédou', 'Vassérédou', 'Tékoulo'],
    'Yomou': ['Yomou Centre', 'Bignamou', 'Doromou', 'Gbackédou'],
    'Boké': ['Boké Centre', 'Dabiss', 'Kamsar', 'Sangarédi'],
    'Boffa': ['Boffa Centre', 'Koba', 'Tamita', 'Tougnifily'],
    'Fria': ['Fria Centre', 'Banguigny', 'Tormelin', 'Sonthonia'],
    'Gaoual': ['Gaoual Centre', 'Foulamory', 'Koumbia', 'Touba'],
    'Koundara': ['Koundara Centre', 'Sambailo', 'Termesse', 'Youkounkoun'],
  }

  useEffect(() => { chargerPrix() }, [])

  const chargerPrix = async () => {
    setChargement(true)
    const { data, error } = await supabase
      .from('prix_marches')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setPrix(data || [])
    setChargement(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'region' ? { prefecture: '', sous_prefecture: '' } : {}),
      ...(name === 'prefecture' ? { sous_prefecture: '' } : {}),
    }))
  }

  const publierPrix = async () => {
    if (!form.produit || !form.region || !form.prix || !form.nom_publieur) {
      alert('Veuillez remplir tous les champs obligatoires *')
      return
    }
    const { error } = await supabase.from('prix_marches').insert([{
      produit: form.produit,
      region: form.region,
      prefecture: form.prefecture,
      sous_prefecture: form.sous_prefecture,
      prix: form.prix,
      unite: form.unite,
      nom_publieur: form.nom_publieur,
    }])
    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      setSucces(true)
      setAfficherFormulaire(false)
      setForm({ produit: '', region: '', prefecture: '', sous_prefecture: '', prix: '', unite: 'kg', nom_publieur: '' })
      chargerPrix()
      setTimeout(() => setSucces(false), 3000)
    }
  }

  const prefecturesList = form.region ? regions[form.region] || [] : []
  const sousPrefecturesList = form.prefecture ? sousPrefectures[form.prefecture] || [] : []

  const prixFiltres = prix.filter(p => {
    const matchRecherche = !recherche ||
      p.produit?.toLowerCase().includes(recherche.toLowerCase()) ||
      p.region?.toLowerCase().includes(recherche.toLowerCase())
    const matchRegion = !filtreRegion || p.region === filtreRegion
    const matchProduit = !filtreProduit || p.produit === filtreProduit
    return matchRecherche && matchRegion && matchProduit
  })

  const input = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', marginTop: '0.25rem', boxSizing: 'border-box' }
  const label = { display: 'block', color: '#1B5E20', fontWeight: 'bold', marginTop: '1rem' }

  const getPrixColor = (p) => {
    const tousLesPrix = prix.filter(x => x.produit === p.produit).map(x => parseInt(x.prix))
    const min = Math.min(...tousLesPrix)
    const max = Math.max(...tousLesPrix)
    if (parseInt(p.prix) === min) return '#E8F5E9'
    if (parseInt(p.prix) === max) return '#FFEBEE'
    return 'white'
  }

  return (
    <div style={{ fontFamily: 'Arial', margin: 0, background: '#F5F5F5', minHeight: '100vh' }}>

      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>📊 Prix des Marchés</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => setAfficherFormulaire(true)}
            style={{ background: 'white', color: '#1B5E20', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Publier un prix
          </button>
          <button onClick={onRetour}
            style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            ← Accueil
          </button>
        </div>
      </header>

      {succes && (
        <div style={{ background: '#E8F5E9', padding: '1rem 2rem', textAlign: 'center', color: '#1B5E20', fontWeight: 'bold' }}>
          🎉 Prix publié avec succès !
        </div>
      )}

      {/* LÉGENDE */}
      <div style={{ background: 'white', padding: '0.75rem 2rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', borderBottom: '1px solid #E8F5E9' }}>
        <span style={{ fontSize: '0.85rem' }}>🟢 Prix le plus bas</span>
        <span style={{ fontSize: '0.85rem' }}>🔴 Prix le plus élevé</span>
        <span style={{ fontSize: '0.85rem' }}>⚪ Prix moyen</span>
      </div>

      {/* FORMULAIRE */}
      {afficherFormulaire && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, overflowY: 'auto' }}>
          <div style={{ maxWidth: '500px', margin: '2rem auto', background: 'white', borderRadius: '12px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#1B5E20', margin: 0 }}>📊 Publier un prix</h2>
              <button onClick={() => setAfficherFormulaire(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>

            <label style={label}>Votre nom *</label>
            <input style={input} name="nom_publieur" value={form.nom_publieur} onChange={handleChange} placeholder="Ex: Mamadou Diallo" />

            <label style={label}>Produit *</label>
            <select style={input} name="produit" value={form.produit} onChange={handleChange}>
              <option value="">-- Choisir un produit --</option>
              {produits.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <label style={label}>Région *</label>
            <select style={input} name="region" value={form.region} onChange={handleChange}>
              <option value="">-- Choisir une région --</option>
              {Object.keys(regions).map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label style={label}>Préfecture</label>
            <select style={input} name="prefecture" value={form.prefecture} onChange={handleChange} disabled={!form.region}>
              <option value="">-- Choisir une préfecture --</option>
              {prefecturesList.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <label style={label}>Sous-préfecture</label>
            <select style={input} name="sous_prefecture" value={form.sous_prefecture} onChange={handleChange} disabled={!form.prefecture}>
              <option value="">-- Choisir une sous-préfecture --</option>
              {sousPrefecturesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 2 }}>
                <label style={label}>Prix (GNF) *</label>
                <input style={input} name="prix" value={form.prix} onChange={handleChange} placeholder="Ex: 12000" type="number" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={label}>Unité</label>
                <select style={input} name="unite" value={form.unite} onChange={handleChange}>
                  <option value="kg">kg</option>
                  <option value="tonne">tonne</option>
                  <option value="sac">sac</option>
                  <option value="botte">botte</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setAfficherFormulaire(false)}
                style={{ flex: 1, background: '#E0E0E0', color: '#333', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={publierPrix}
                style={{ flex: 2, background: '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                📊 Publier
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>

        {/* FILTRES */}
        <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input placeholder="🔍 Rechercher produit ou région..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            style={{ flex: 2, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '200px' }} />
          <select value={filtreProduit} onChange={e => setFiltreProduit(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '150px' }}>
            <option value="">Tous les produits</option>
            {produits.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={filtreRegion} onChange={e => setFiltreRegion(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', minWidth: '150px' }}>
            <option value="">Toutes régions</option>
            {Object.keys(regions).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={chargerPrix}
            style={{ background: '#1B5E20', color: 'white', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            🔄
          </button>
        </div>

        {/* TABLEAU DES PRIX */}
        {chargement ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>⏳ Chargement...</div>
        ) : prixFiltres.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', color: '#666' }}>
            <p style={{ fontSize: '3rem' }}>📊</p>
            <p>Aucun prix disponible</p>
            <button onClick={() => setAfficherFormulaire(true)}
              style={{ background: '#1B5E20', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
              + Publier le premier prix
            </button>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1rem 1.5rem', background: '#E8F5E9', borderBottom: '1px solid #C8E6C9' }}>
              <h2 style={{ margin: 0, color: '#1B5E20', fontSize: '1.1rem' }}>
                📊 Prix des marchés ({prixFiltres.length} entrées)
              </h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F5F5F5' }}>
                    {['Produit', 'Prix', 'Région', 'Préfecture', 'Sous-préfecture', 'Publié par', 'Date'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#1B5E20', fontSize: '0.85rem', fontWeight: 'bold', borderBottom: '1px solid #E0E0E0' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prixFiltres.map((p, i) => (
                    <tr key={p.id} style={{ background: getPrixColor(p), borderBottom: '1px solid #F0F0F0' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#1B5E20' }}>{p.produit}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#E65100', fontSize: '1.1rem' }}>
                        {parseInt(p.prix).toLocaleString()} GNF/{p.unite}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>{p.region}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{p.prefecture || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{p.sous_prefecture || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem' }}>{p.nom_publieur}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#888' }}>
                        {new Date(p.created_at).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Prix des marchés 🇬🇳</p>
      </footer>
    </div>
  )
}

export default Prix