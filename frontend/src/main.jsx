import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { ThemeProvider } from './lib/theme-provider';
import { AuthProvider } from './contexts/auth-context';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <div className='h-screen w-screen'>
          <AuthProvider>
            <App />
          </AuthProvider>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
