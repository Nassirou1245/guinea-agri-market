import { useState } from 'react'

function Paiement({ annonce, onFermer }) {
  const [methode, setMethode] = useState('')
  const [etape, setEtape] = useState(1)
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [confirme, setConfirme] = useState(false)

  const montant = parseInt(annonce?.prix || 0) * parseInt(annonce?.quantite || 1)

  if (confirme) return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: '4rem', margin: 0 }}>🎉</p>
        <h2 style={{ color: '#1B5E20', margin: '1rem 0' }}>Commande confirmée !</h2>
        <p style={{ color: '#555', marginBottom: '1rem' }}>
          Votre commande a été envoyée à <strong>{annonce?.nom_vendeur}</strong>.
        </p>
        <div style={{ background: '#E8F5E9', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ margin: '0.25rem 0', color: '#1B5E20' }}>📦 {annonce?.produit}</p>
          <p style={{ margin: '0.25rem 0', color: '#1B5E20' }}>💰 {montant.toLocaleString()} GNF</p>
          <p style={{ margin: '0.25rem 0', color: '#1B5E20' }}>📱 {methode === 'orange' ? 'Orange Money' : 'MTN MoMo'}</p>
        </div>
        <a href={`https://wa.me/${(annonce?.whatsapp || annonce?.telephone || '').replace(/\s/g, '')}?text=Bonjour ${annonce?.nom_vendeur}, j'ai payé ${montant.toLocaleString()} GNF via ${methode === 'orange' ? 'Orange Money' : 'MTN MoMo'} pour ${annonce?.produit}.`}
          target="_blank"
          style={{ display: 'block', background: '#25D366', color: 'white', padding: '1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', marginBottom: '1rem' }}>
          📱 Envoyer confirmation WhatsApp
        </a>
        <button onClick={onFermer}
          style={{ background: '#E0E0E0', color: '#333', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}>
          Fermer
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '450px', width: '100%' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#1B5E20', margin: 0 }}>💰 Paiement Mobile Money</h2>
          <button onClick={onFermer} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>✕</button>
        </div>

        <div style={{ background: '#F5F5F5', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#1B5E20', margin: '0 0 0.5rem' }}>📦 Résumé</h3>
          <p style={{ margin: '0.25rem 0', color: '#555' }}>Produit : <strong>{annonce?.produit}</strong></p>
          <p style={{ margin: '0.25rem 0', color: '#555' }}>Vendeur : <strong>{annonce?.nom_vendeur}</strong></p>
          <p style={{ margin: '0.25rem 0', color: '#555' }}>Quantité : <strong>{annonce?.quantite} {annonce?.unite}</strong></p>
          <p style={{ margin: '0.25rem 0', color: '#1B5E20', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Total : {montant.toLocaleString()} GNF
          </p>
        </div>

        {etape === 1 && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Choisir votre méthode :</h3>

            <div onClick={() => setMethode('orange')}
              style={{ border: `3px solid ${methode === 'orange' ? '#FF6600' : '#E0E0E0'}`, borderRadius: '12px', padding: '1rem', marginBottom: '1rem', cursor: 'pointer', background: methode === 'orange' ? '#FFF3E0' : 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: '#FF6600', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>
                OM
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#FF6600' }}>Orange Money</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Composez *144#</p>
              </div>
              {methode === 'orange' && <span style={{ marginLeft: 'auto', color: '#FF6600', fontSize: '1.5rem' }}>✓</span>}
            </div>

            <div onClick={() => setMethode('mtn')}
              style={{ border: `3px solid ${methode === 'mtn' ? '#FFD700' : '#E0E0E0'}`, borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', cursor: 'pointer', background: methode === 'mtn' ? '#FFFDE7' : 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', background: '#FFD700', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                MTN
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#FFA000' }}>MTN Mobile Money</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Composez *160#</p>
              </div>
              {methode === 'mtn' && <span style={{ marginLeft: 'auto', color: '#FFA000', fontSize: '1.5rem' }}>✓</span>}
            </div>

            <button onClick={() => methode ? setEtape(2) : alert('Veuillez choisir une méthode')}
              style={{ width: '100%', background: methode ? '#1B5E20' : '#E0E0E0', color: methode ? 'white' : '#999', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: methode ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
              Continuer →
            </button>
          </div>
        )}

        {etape === 2 && (
          <div>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Vos informations :</h3>

            <label style={{ display: 'block', color: '#1B5E20', fontWeight: 'bold', marginBottom: '0.25rem' }}>Votre nom *</label>
            <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex: Mamadou Diallo"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', marginBottom: '1rem', boxSizing: 'border-box' }} />

            <label style={{ display: 'block', color: '#1B5E20', fontWeight: 'bold', marginBottom: '0.25rem' }}>Votre téléphone *</label>
            <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Ex: 620 00 00 00"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #C8E6C9', fontSize: '1rem', marginBottom: '1rem', boxSizing: 'border-box' }} />

            <div style={{ background: methode === 'orange' ? '#FFF3E0' : '#FFFDE7', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', border: `1px solid ${methode === 'orange' ? '#FF6600' : '#FFD700'}` }}>
              <h4 style={{ margin: '0 0 0.5rem', color: methode === 'orange' ? '#FF6600' : '#FFA000' }}>
                {methode === 'orange' ? '🟠 Instructions Orange Money' : '🟡 Instructions MTN MoMo'}
              </h4>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>1. Composez <strong>{methode === 'orange' ? '*144#' : '*160#'}</strong></p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>2. Choisissez <strong>"Envoyer de l'argent"</strong></p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>3. Numéro vendeur : <strong>{annonce?.telephone}</strong></p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>4. Montant : <strong>{montant.toLocaleString()} GNF</strong></p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>5. Confirmez avec votre <strong>PIN</strong></p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setEtape(1)}
                style={{ flex: 1, background: '#E0E0E0', color: '#333', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                ← Retour
              </button>
              <button onClick={() => nom && telephone ? setConfirme(true) : alert('Veuillez remplir vos informations')}
                style={{ flex: 2, background: '#1B5E20', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                ✅ J'ai payé !
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paiement