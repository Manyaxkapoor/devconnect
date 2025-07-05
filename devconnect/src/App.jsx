import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Header />
      <div className="flex items-center justify-center p-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-8 mb-8">
            <a href="https://vite.dev" target="_blank" className="group">
              <img 
                src={viteLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110" 
                alt="Vite logo" 
              />
            </a>
            <a href="https://react.dev" target="_blank" className="group">
              <img 
                src={reactLogo} 
                className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 animate-bounce-gentle" 
                alt="React logo" 
              />
            </a>
          </div>
          
          <h1 className="font-display text-5xl font-bold text-primary-800 mb-8 animate-fade-in">
            DevConnect
          </h1>
          
          <div className="bg-white rounded-2xl shadow-soft p-8 mb-8 animate-slide-up">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              Count is {count}
            </button>
            <p className="text-secondary-600 font-medium">
              Edit <code className="font-mono bg-secondary-100 px-2 py-1 rounded text-secondary-800">src/App.jsx</code> and save to test HMR
            </p>
          </div>
          
          <p className="text-secondary-500 font-medium">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
