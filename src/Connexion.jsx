import { useState } from 'react'
import { supabase } from './supabase'

function Connexion({ onConnecte, onRetour }) {
  const [mode, setMode] = useState('connexion')
  const [form, setForm] = useState({ email: '', password: '', nom: '', prenom: '', telephone: '' })
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const seConnecter = async () => {
    if (!form.email || !form.password) {
      setErreur('Veuillez remplir tous les champs')
      return
    }
    setChargement(true)
    setErreur('')
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    setChargement(false)
    if (error) {
      setErreur('Email ou mot de passe incorrect')
    } else {
      onConnecte(data.user)
    }
  }

  const sInscrire = async () => {
    if (!form.email || !form.password || !form.nom || !form.prenom || !form.telephone) {
      setErreur('Veuillez remplir tous les champs obligatoires *')
      return
    }
    if (form.password.length < 6) {
      setErreur('Le mot de passe doit avoir au moins 6 caractères')
      return
    }
    setChargement(true)
    setErreur('')
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nom: form.nom,
          prenom: form.prenom,
          telephone: form.telephone,
        }
      }
    })
    setChargement(false)
    if (error) {
      setErreur('Erreur : ' + error.message)
    } else {
      setSucces('🎉 Compte créé ! Vérifiez votre email pour confirmer.')
    }
  }

  const input = {
    width: '100%', padding: '0.75rem', borderRadius: '8px',
    border: '1px solid #C8E6C9', fontSize: '1rem',
    marginTop: '0.25rem', boxSizing: 'border-box'
  }
  const label = { display: 'block', color: '#1B5E20', fontWeight: 'bold', marginTop: '1rem' }

  return (
    <div style={{ fontFamily: 'Arial', margin: 0, background: '#F5F5F5', minHeight: '100vh' }}>

      <header style={{ background: '#1B5E20', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🌿 GUINEA AGRI MARKET</h1>
        <button onClick={onRetour} style={{ color: 'white', background: 'transparent', border: '1px solid white', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
          ← Accueil
        </button>
      </header>

      <div style={{ maxWidth: '450px', margin: '3rem auto', background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '3rem', margin: 0 }}>🌿</p>
          <h2 style={{ color: '#1B5E20', margin: '0.5rem 0' }}>
            {mode === 'connexion' ? 'Se connecter' : 'Créer un compte'}
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Guinea Agri Market</p>
        </div>

        {/* ONGLETS */}
        <div style={{ display: 'flex', marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #C8E6C9' }}>
          <button onClick={() => { setMode('connexion'); setErreur(''); setSucces('') }}
            style={{ flex: 1, padding: '0.75rem', border: 'none', cursor: 'pointer', background: mode === 'connexion' ? '#1B5E20' : 'white', color: mode === 'connexion' ? 'white' : '#1B5E20', fontWeight: 'bold' }}>
            Se connecter
          </button>
          <button onClick={() => { setMode('inscription'); setErreur(''); setSucces('') }}
            style={{ flex: 1, padding: '0.75rem', border: 'none', cursor: 'pointer', background: mode === 'inscription' ? '#1B5E20' : 'white', color: mode === 'inscription' ? 'white' : '#1B5E20', fontWeight: 'bold' }}>
            Créer un compte
          </button>
        </div>

        {/* FORMULAIRE CONNEXION */}
        {mode === 'connexion' && (
          <div>
            <label style={label}>Email *</label>
            <input style={input} name="email" type="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" />
            <label style={label}>Mot de passe *</label>
            <input style={input} name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            {erreur && <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>{erreur}</p>}
            <button onClick={seConnecter} disabled={chargement}
              style={{ width: '100%', marginTop: '2rem', background: chargement ? '#A5D6A7' : '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              {chargement ? '⏳ Connexion...' : '🔐 Se connecter'}
            </button>
          </div>
        )}

        {/* FORMULAIRE INSCRIPTION */}
        {mode === 'inscription' && (
          <div>
            <label style={label}>Nom *</label>
            <input style={input} name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" />
            <label style={label}>Prénom *</label>
            <input style={input} name="prenom" value={form.prenom} onChange={handleChange} placeholder="Votre prénom" />
            <label style={label}>Téléphone *</label>
            <input style={input} name="telephone" value={form.telephone} onChange={handleChange} placeholder="Ex: 620 00 00 00" />
            <label style={label}>Email *</label>
            <input style={input} name="email" type="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" />
            <label style={label}>Mot de passe * (minimum 6 caractères)</label>
            <input style={input} name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            {erreur && <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>{erreur}</p>}
            {succes && <p style={{ color: '#1B5E20', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{succes}</p>}
            <button onClick={sInscrire} disabled={chargement}
              style={{ width: '100%', marginTop: '2rem', background: chargement ? '#A5D6A7' : '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              {chargement ? '⏳ Création...' : '✅ Créer mon compte'}
            </button>
          </div>
        )}
      </div>

      <footer style={{ background: '#1B5E20', color: 'white', textAlign: 'center', padding: '1.5rem', marginTop: '2rem' }}>
        <p style={{ margin: 0 }}>© 2026 Guinea Agri Market — Conakry, Guinée 🇬🇳</p>
      </footer>
    </div>
  )
}

export default Connexion