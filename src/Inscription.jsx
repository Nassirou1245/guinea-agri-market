import { useState } from 'react'
import { supabase } from './supabase'

function Inscription({ onRetour }) {
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

  const districts = {
    'Almamya': ['Almamya 1', 'Almamya 2', 'Almamya 3'],
    'Boulbinet': ['Boulbinet 1', 'Boulbinet 2'],
    'Coronthie': ['Coronthie 1', 'Coronthie 2', 'Coronthie 3'],
    'Tombo': ['Tombo 1', 'Tombo 2', 'Tombo 3'],
    'Bellevue': ['Bellevue 1', 'Bellevue 2', 'Bellevue 3'],
    'Cameroun': ['Cameroun 1', 'Cameroun 2'],
    'Dixinn Centre': ['Dixinn Centre 1', 'Dixinn Centre 2'],
    'Landréah': ['Landréah 1', 'Landréah 2'],
    'Bonfi': ['Bonfi 1', 'Bonfi 2', 'Bonfi 3'],
    'Coléah': ['Coléah 1', 'Coléah 2'],
    'Matam Centre': ['Matam Centre 1', 'Matam Centre 2'],
    'Port': ['Port 1', 'Port 2'],
    'Aware': ['Aware 1', 'Aware 2', 'Aware 3'],
    'Dabondy': ['Dabondy 1', 'Dabondy 2', 'Dabondy 3'],
    'Kagbelen': ['Kagbelen 1', 'Kagbelen 2'],
    'Sonfonia': ['Sonfonia 1', 'Sonfonia 2', 'Sonfonia 3'],
    'Cimenterie': ['Cimenterie 1', 'Cimenterie 2'],
    'Koloma': ['Koloma 1', 'Koloma 2', 'Koloma 3'],
    'Lambanyi': ['Lambanyi 1', 'Lambanyi 2'],
    'Nongo': ['Nongo 1', 'Nongo 2', 'Nongo 3'],
    'Kindia Centre': ['Madina', 'Banko', 'Souguéta Village', 'Kouria Village'],
    'Souguéta': ['Souguéta 1', 'Souguéta 2', 'Souguéta 3'],
    'Kouria': ['Kouria 1', 'Kouria 2'],
    'Bangouya': ['Bangouya 1', 'Bangouya 2'],
    'Coyah Centre': ['Coyah Ville', 'Coyah Rural 1', 'Coyah Rural 2'],
    'Manéah': ['Manéah 1', 'Manéah 2', 'Manéah 3'],
    'Wonkifong': ['Wonkifong 1', 'Wonkifong 2'],
    'Ouassou': ['Ouassou 1', 'Ouassou 2'],
    'Dubréka Centre': ['Dubréka Ville', 'Dubréka Rural'],
    'Khorira': ['Khorira 1', 'Khorira 2'],
    'Tanènè': ['Tanènè 1', 'Tanènè 2', 'Tanènè 3'],
    'Kouriah': ['Kouriah 1', 'Kouriah 2'],
    'Forécariah Centre': ['Forécariah Ville', 'Forécariah Rural'],
    'Benty': ['Benty 1', 'Benty 2'],
    'Farmoriah': ['Farmoriah 1', 'Farmoriah 2'],
    'Maférénya': ['Maférénya 1', 'Maférénya 2'],
    'Télimélé Centre': ['Télimélé Ville', 'Télimélé Rural'],
    'Daramagnaki': ['Daramagnaki 1', 'Daramagnaki 2'],
    'Kollet': ['Kollet 1', 'Kollet 2'],
    'Missira': ['Missira 1', 'Missira 2'],
    'Labé Centre': ['Labé Ville', 'Tata', 'Hafia', 'Daka'],
    'Popodara': ['Popodara 1', 'Popodara 2', 'Popodara 3'],
    'Noussy': ['Noussy 1', 'Noussy 2'],
    'Kouramangui': ['Kouramangui 1', 'Kouramangui 2'],
    'Pita Centre': ['Pita Ville', 'Pita Rural 1', 'Pita Rural 2'],
    'Timbi Madina': ['Timbi Madina 1', 'Timbi Madina 2'],
    'Timbi Touni': ['Timbi Touni 1', 'Timbi Touni 2'],
    'Pelel': ['Pelel 1', 'Pelel 2'],
    'Mali Centre': ['Mali Ville', 'Mali Rural'],
    'Hidayatou': ['Hidayatou 1', 'Hidayatou 2'],
    'Labé Koura': ['Labé Koura 1', 'Labé Koura 2'],
    'Madina Wora': ['Madina Wora 1', 'Madina Wora 2'],
    'Koubia Centre': ['Koubia Ville', 'Koubia Rural'],
    'Matakaou': ['Matakaou 1', 'Matakaou 2'],
    'Wendou Mbour': ['Wendou Mbour 1', 'Wendou Mbour 2'],
    'Tougué Centre': ['Tougué Ville', 'Tougué Rural'],
    'Gongoré': ['Gongoré 1', 'Gongoré 2'],
    'Kansangui': ['Kansangui 1', 'Kansangui 2'],
    'Bourouwal': ['Bourouwal 1', 'Bourouwal 2'],
    'Mamou Centre': ['Mamou Ville', 'Saramoussaya Village', 'Konkouré Village'],
    'Porédaka': ['Porédaka 1', 'Porédaka 2'],
    'Saramoussaya': ['Saramoussaya 1', 'Saramoussaya 2'],
    'Konkouré': ['Konkouré 1', 'Konkouré 2'],
    'Dalaba Centre': ['Dalaba Ville', 'Dalaba Rural'],
    'Ditinn': ['Ditinn 1', 'Ditinn 2'],
    'Mitty': ['Mitty 1', 'Mitty 2'],
    'Kaala': ['Kaala 1', 'Kaala 2'],
    'Kankan Centre': ['Kankan Ville', 'Kabada', 'Koumana', 'Nafadji'],
    'Baté Nafadji': ['Baté Nafadji 1', 'Baté Nafadji 2'],
    'Missamana': ['Missamana 1', 'Missamana 2'],
    'Sabadou': ['Sabadou 1', 'Sabadou 2'],
    'Kérouané Centre': ['Kérouané Ville', 'Kérouané Rural'],
    'Banankoro': ['Banankoro 1', 'Banankoro 2'],
    'Damaro': ['Damaro 1', 'Damaro 2'],
    'Sibiribaro': ['Sibiribaro 1', 'Sibiribaro 2'],
    'Kouroussa Centre': ['Kouroussa Ville', 'Kouroussa Rural'],
    'Doura': ['Doura 1', 'Doura 2'],
    'Sanguiana': ['Sanguiana 1', 'Sanguiana 2'],
    'Cisséla': ['Cisséla 1', 'Cisséla 2'],
    'Mandiana Centre': ['Mandiana Ville', 'Mandiana Rural'],
    'Dialakoro': ['Dialakoro 1', 'Dialakoro 2'],
    'Morodou': ['Morodou 1', 'Morodou 2'],
    'Kantoumanina': ['Kantoumanina 1', 'Kantoumanina 2'],
    'Siguiri Centre': ['Siguiri Ville', 'Siguiri Rural'],
    'Doko': ['Doko 1', 'Doko 2'],
    'Nounkounkan': ['Nounkounkan 1', 'Nounkounkan 2'],
    'Naboun': ['Naboun 1', 'Naboun 2'],
    'Faranah Centre': ['Faranah Ville', 'Banian Village', 'Tiro Village'],
    'Banian': ['Banian 1', 'Banian 2'],
    'Baro': ['Baro 1', 'Baro 2'],
    'Tiro': ['Tiro 1', 'Tiro 2'],
    'Dabola Centre': ['Dabola Ville', 'Dabola Rural'],
    'Arfamoussaya': ['Arfamoussaya 1', 'Arfamoussaya 2'],
    'Koba': ['Koba 1', 'Koba 2'],
    'Ndéma': ['Ndéma 1', 'Ndéma 2'],
    'Dinguiraye Centre': ['Dinguiraye Ville', 'Dinguiraye Rural'],
    'Lansanaya': ['Lansanaya 1', 'Lansanaya 2'],
    'Maleya': ['Maleya 1', 'Maleya 2'],
    'Dogomet': ['Dogomet 1', 'Dogomet 2'],
    'Kissidougou Centre': ['Kissidougou Ville', 'Kissidougou Rural'],
    'Fermessadou': ['Fermessadou 1', 'Fermessadou 2'],
    'Gbangbadou': ['Gbangbadou 1', 'Gbangbadou 2'],
    'Yendé Millimou': ['Yendé Millimou 1', 'Yendé Millimou 2'],
    'N\'Zérékoré Centre': ['N\'Zérékoré Ville', 'Gouécké Village', 'Zébéla Village'],
    'Gouécké': ['Gouécké 1', 'Gouécké 2'],
    'Kobela': ['Kobela 1', 'Kobela 2'],
    'Zébéla': ['Zébéla 1', 'Zébéla 2'],
    'Beyla Centre': ['Beyla Ville', 'Beyla Rural'],
    'Sinko': ['Sinko 1', 'Sinko 2'],
    'Moussadou': ['Moussadou 1', 'Moussadou 2'],
    'Diécké': ['Diécké 1', 'Diécké 2'],
    'Guéckédou Centre': ['Guéckédou Ville', 'Guéckédou Rural'],
    'Bolodou': ['Bolodou 1', 'Bolodou 2'],
    'Fangamadou': ['Fangamadou 1', 'Fangamadou 2'],
    'Termenta': ['Termenta 1', 'Termenta 2'],
    'Lola Centre': ['Lola Ville', 'Lola Rural'],
    'Bossou': ['Bossou 1', 'Bossou 2'],
    'Nzo': ['Nzo 1', 'Nzo 2'],
    'Koulé': ['Koulé 1', 'Koulé 2'],
    'Macenta Centre': ['Macenta Ville', 'Macenta Rural'],
    'Sérédou': ['Sérédou 1', 'Sérédou 2'],
    'Vassérédou': ['Vassérédou 1', 'Vassérédou 2'],
    'Tékoulo': ['Tékoulo 1', 'Tékoulo 2'],
    'Yomou Centre': ['Yomou Ville', 'Yomou Rural'],
    'Bignamou': ['Bignamou 1', 'Bignamou 2'],
    'Doromou': ['Doromou 1', 'Doromou 2'],
    'Gbackédou': ['Gbackédou 1', 'Gbackédou 2'],
    'Boké Centre': ['Boké Ville', 'Kamsar Village', 'Sangarédi Village'],
    'Dabiss': ['Dabiss 1', 'Dabiss 2'],
    'Kamsar': ['Kamsar 1', 'Kamsar 2', 'Kamsar 3'],
    'Sangarédi': ['Sangarédi 1', 'Sangarédi 2'],
    'Boffa Centre': ['Boffa Ville', 'Boffa Rural'],
    'Tamita': ['Tamita 1', 'Tamita 2'],
    'Tougnifily': ['Tougnifily 1', 'Tougnifily 2'],
    'Fria Centre': ['Fria Ville', 'Fria Rural'],
    'Banguigny': ['Banguigny 1', 'Banguigny 2'],
    'Tormelin': ['Tormelin 1', 'Tormelin 2'],
    'Sonthonia': ['Sonthonia 1', 'Sonthonia 2'],
    'Gaoual Centre': ['Gaoual Ville', 'Gaoual Rural'],
    'Foulamory': ['Foulamory 1', 'Foulamory 2'],
    'Koumbia': ['Koumbia 1', 'Koumbia 2'],
    'Touba': ['Touba 1', 'Touba 2'],
    'Koundara Centre': ['Koundara Ville', 'Koundara Rural'],
    'Sambailo': ['Sambailo 1', 'Sambailo 2'],
    'Termesse': ['Termesse 1', 'Termesse 2'],
    'Youkounkoun': ['Youkounkoun 1', 'Youkounkoun 2'],
  }

  const cultures = [
    '🌾 Riz', '🌽 Maïs', '🥜 Arachide', '🌾 Fonio',
    '🥔 Manioc', '🥔 Pomme de terre', '🍅 Tomate', '🧅 Oignon',
    '🌶️ Piment', '🍌 Banane', '🥭 Mangue', '🍍 Ananas',
    '☕ Café', '🍫 Cacao', '🌴 Huile de palme', '🌰 Anacarde'
  ]

  const typesUtilisateur = [
    '👨‍🌾 Producteur', '🤝 Coopérative', '🏭 Transformateur',
    '🛒 Consommateur', '📦 Grossiste', '🍽️ Restaurant',
    '🏨 Hôtel', '🏪 Supermarché', '✈️ Exportateur'
  ]

  const [form, setForm] = useState({
    nom: '', prenom: '', telephone: '', whatsapp: '',
    region: '', prefecture: '', sousPrefecture: '', district: '',
    superficie: '', cooperative: '',
    culturesSelectionnees: [],
    typeUtilisateur: '',
  })

  const [etape, setEtape] = useState(1)
  const [succes, setSucces] = useState(false)
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'region' ? { prefecture: '', sousPrefecture: '', district: '' } : {}),
      ...(name === 'prefecture' ? { sousPrefecture: '', district: '' } : {}),
      ...(name === 'sousPrefecture' ? { district: '' } : {}),
    }))
  }

  const toggleCulture = (culture) => {
    setForm(prev => ({
      ...prev,
      culturesSelectionnees: prev.culturesSelectionnees.includes(culture)
        ? prev.culturesSelectionnees.filter(c => c !== culture)
        : [...prev.culturesSelectionnees, culture]
    }))
  }

  const prefecturesList = form.region ? regions[form.region] || [] : []
  const sousPrefecturesList = form.prefecture ? sousPrefectures[form.prefecture] || [] : []
  const districtsList = form.sousPrefecture ? districts[form.sousPrefecture] || [] : []

  const inscrire = async () => {
    if (form.culturesSelectionnees.length === 0) {
      alert('Veuillez sélectionner au moins une culture')
      return
    }
    setChargement(true)
    setErreur('')
    const { error } = await supabase.from('agriculteurs').insert([{
      nom: form.nom,
      prenom: form.prenom,
      telephone: form.telephone,
      whatsapp: form.whatsapp || form.telephone,
      region: form.region,
      prefecture: form.prefecture,
      sous_prefecture: form.sousPrefecture,
      district: form.district,
      superficie: form.superficie,
      cooperative: form.cooperative,
      cultures: form.culturesSelectionnees.join(', '),
      type_utilisateur: form.typeUtilisateur,
    }])
    setChargement(false)
    if (error) {
      setErreur('Erreur : ' + error.message)
    } else {
      setSucces(true)
    }
  }

  const input = {
    width: '100%', padding: '0.75rem', borderRadius: '8px',
    border: '1px solid #C8E6C9', fontSize: '1rem',
    marginTop: '0.25rem', boxSizing: 'border-box'
  }
  const label = { display: 'block', color: '#1B5E20', fontWeight: 'bold', marginTop: '1rem' }

  if (succes) return (
    <div style={{ minHeight: '100vh', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <p style={{ fontSize: '4rem', margin: 0 }}>🎉</p>
        <h2 style={{ color: '#1B5E20', fontSize: '2rem' }}>Inscription réussie !</h2>
        <p style={{ color: '#2E7D32', fontSize: '1.1rem' }}>Bienvenue sur Guinea Agri Market, {form.prenom} {form.nom} !</p>
        <p style={{ color: '#555' }}>Région : {form.region} — Préfecture : {form.prefecture}</p>
        <p style={{ color: '#555' }}>Cultures : {form.culturesSelectionnees.join(', ')}</p>
        <p style={{ color: '#555' }}>Nous vous contacterons sur le {form.telephone}</p>
        <button onClick={onRetour}
          style={{ marginTop: '1.5rem', background: '#1B5E20', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', fontSize: '1rem', cursor: 'pointer' }}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: 'Arial', margin: 0, background: '#F5F5F5', minHeight: '100vh' }}>
      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET</h1>
        <button onClick={onRetour} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
          ← Accueil
        </button>
      </header>

      <div style={{ maxWidth: '600px', margin: '2rem auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '3rem', margin: 0 }}>👨‍🌾</p>
          <h2 style={{ color: '#1B5E20', margin: '0.5rem 0' }}>Inscription</h2>
          <p style={{ color: '#666', margin: 0 }}>Rejoignez Guinea Agri Market</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: etape >= n ? '#1B5E20' : '#E0E0E0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {etape > n ? '✓' : n}
              </div>
              {n < 3 && <div style={{ width: '50px', height: '3px', background: etape > n ? '#1B5E20' : '#E0E0E0' }}></div>}
            </div>
          ))}
        </div>

        {etape === 1 && (
          <div>
            <h3 style={{ color: '#2E7D32', borderBottom: '2px solid #E8F5E9', paddingBottom: '0.5rem' }}>📝 Étape 1 — Informations personnelles</h3>
            <label style={label}>Type d'utilisateur *</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {typesUtilisateur.map(t => (
                <div key={t} onClick={() => setForm(prev => ({ ...prev, typeUtilisateur: t }))}
                  style={{ padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', border: '2px solid', borderColor: form.typeUtilisateur === t ? '#1B5E20' : '#E0E0E0', background: form.typeUtilisateur === t ? '#E8F5E9' : 'white', color: form.typeUtilisateur === t ? '#1B5E20' : '#666', fontWeight: form.typeUtilisateur === t ? 'bold' : 'normal', fontSize: '0.9rem' }}>
                  {t}
                </div>
              ))}
            </div>
            <label style={label}>Nom *</label>
            <input style={input} name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom de famille" />
            <label style={label}>Prénom *</label>
            <input style={input} name="prenom" value={form.prenom} onChange={handleChange} placeholder="Votre prénom" />
            <label style={label}>Numéro de téléphone *</label>
            <input style={input} name="telephone" value={form.telephone} onChange={handleChange} placeholder="Ex: 620 00 00 00" />
            <label style={label}>Numéro WhatsApp</label>
            <input style={input} name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Si différent du téléphone" />
            <button onClick={() => form.nom && form.prenom && form.telephone && form.typeUtilisateur ? setEtape(2) : alert('Veuillez remplir tous les champs obligatoires *')}
              style={{ width: '100%', marginTop: '2rem', background: '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Continuer →
            </button>
          </div>
        )}

        {etape === 2 && (
          <div>
            <h3 style={{ color: '#2E7D32', borderBottom: '2px solid #E8F5E9', paddingBottom: '0.5rem' }}>📍 Étape 2 — Localisation</h3>
            <label style={label}>Région *</label>
            <select style={input} name="region" value={form.region} onChange={handleChange}>
              <option value="">-- Choisir une région --</option>
              {Object.keys(regions).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <label style={label}>Préfecture *</label>
            <select style={input} name="prefecture" value={form.prefecture} onChange={handleChange} disabled={!form.region}>
              <option value="">-- Choisir une préfecture --</option>
              {prefecturesList.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <label style={label}>Sous-préfecture</label>
            <select style={input} name="sousPrefecture" value={form.sousPrefecture} onChange={handleChange} disabled={!form.prefecture}>
              <option value="">-- Choisir une sous-préfecture --</option>
              {sousPrefecturesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label style={label}>District</label>
            <select style={input} name="district" value={form.district} onChange={handleChange} disabled={!form.sousPrefecture}>
              <option value="">-- Choisir un district --</option>
              {districtsList.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setEtape(1)} style={{ flex: 1, background: '#E0E0E0', color: '#333', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', cursor: 'pointer' }}>← Retour</button>
              <button onClick={() => form.region && form.prefecture ? setEtape(3) : alert('Veuillez choisir la région et la préfecture')}
                style={{ flex: 2, background: '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                Continuer →
              </button>
            </div>
          </div>
        )}

        {etape === 3 && (
          <div>
            <h3 style={{ color: '#2E7D32', borderBottom: '2px solid #E8F5E9', paddingBottom: '0.5rem' }}>🌾 Étape 3 — Votre exploitation</h3>
            <label style={label}>Superficie cultivée (en hectares)</label>
            <input style={input} name="superficie" value={form.superficie} onChange={handleChange} placeholder="Ex: 2.5" type="number" />
            <label style={label}>Coopérative (si membre)</label>
            <input style={input} name="cooperative" value={form.cooperative} onChange={handleChange} placeholder="Nom de votre coopérative" />
            <label style={label}>Vos cultures * (cliquez pour sélectionner)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {cultures.map(c => (
                <div key={c} onClick={() => toggleCulture(c)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', border: '2px solid', borderColor: form.culturesSelectionnees.includes(c) ? '#1B5E20' : '#E0E0E0', background: form.culturesSelectionnees.includes(c) ? '#E8F5E9' : 'white', color: form.culturesSelectionnees.includes(c) ? '#1B5E20' : '#666', fontWeight: form.culturesSelectionnees.includes(c) ? 'bold' : 'normal', fontSize: '0.9rem' }}>
                  {c}
                </div>
              ))}
            </div>
            {erreur && <p style={{ color: 'red', marginTop: '1rem' }}>{erreur}</p>}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => setEtape(2)} style={{ flex: 1, background: '#E0E0E0', color: '#333', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', cursor: 'pointer' }}>← Retour</button>
              <button onClick={inscrire} disabled={chargement}
                style={{ flex: 2, background: chargement ? '#A5D6A7' : '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: chargement ? 'wait' : 'pointer' }}>
                {chargement ? '⏳ Inscription en cours...' : '✅ S\'inscrire'}
              </button>
            </div>
          </div>
        )}
      </div>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Conakry, Guinée 🇬🇳</p>
      </footer>
    </div>
  )
}

export default Inscription