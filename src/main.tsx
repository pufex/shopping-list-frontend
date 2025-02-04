import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import AuthProvider from './auth/AuthContext.tsx'
import "./assets/styles.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App /> 
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
