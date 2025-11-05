import { BrowserRouter, Routes, Route } from 'react-router'

import InitialPage from "@/pages/InitialPage.tsx"
import AuthLayout from './pages/AuthLayout'
import SignupPage from './core-components/SignupPage'
import LoginPage from './core-components/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<InitialPage />} />

        <Route element={<AuthLayout />}>
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}