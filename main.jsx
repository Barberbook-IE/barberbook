import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BarberOnboard from './BarberOnboard.jsx'

const isJoin = window.location.pathname.startsWith('/join') || window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isJoin ? <BarberOnboard /> : <App />}
  </StrictMode>
)
