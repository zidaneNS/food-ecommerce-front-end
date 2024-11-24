import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import './index.css'
import App from './App.jsx'

if (process.env.NODE_ENV === 'production') disableReactDevTools();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
