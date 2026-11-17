import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Login from './Login/register.tsx'
import CreateAccount from './Login/createAccount.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path='create_account' element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
