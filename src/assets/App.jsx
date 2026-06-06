function App() {
  return (
    <div style={{ background: '#1B5E20', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>
        🌿 GUINEA AGRI MARKET
      </h1>
      <p style={{ color: '#C8E6C9', fontSize: '1.2rem', marginTop: '1rem' }}>
        Connecter les producteurs, développer l'agriculture, nourrir l'avenir.
      </p>
      <button style={{ marginTop: '2rem', background: 'white', color: '#1B5E20', padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
        Commencer maintenant
      </button>
    </div>
  )
}

export default App