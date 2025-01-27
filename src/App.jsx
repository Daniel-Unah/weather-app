import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import wustlLogo from './assets/wustl.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://wustl.edu" target="_blank" rel="noreferrer">
          <img src={wustlLogo} className="logo wustl" alt="WUSTL logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WUSTL + Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WUSTL, Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
