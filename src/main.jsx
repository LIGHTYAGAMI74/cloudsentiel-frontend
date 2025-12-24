import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import Homepage from './homepage.jsx'
import { BrowserRouter } from 'react-router-dom'
import Start from './start.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>

  <Start />
  </BrowserRouter>,
)


