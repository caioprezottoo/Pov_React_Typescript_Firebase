import { BrowserRouter, Routes, Route } from 'react-router'

import InitialPage from "@/pages/InitialPage.tsx"
import AuthLayout from './core-components/AuthLayout'
import AppLayout from './core-components/AppLayout'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ExplorePage from './pages/ExplorePage'
import ReviewedPage from './pages/ReviewedPage'
import WatchListPage from './pages/WatchListPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<InitialPage />} />

        <Route element={<AuthLayout />}>
          <Route path='signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
        </Route>

        <Route element={<AppLayout />} >
          <Route path='explore' element={<ExplorePage />} />
          <Route path='reviewed' element={<ReviewedPage />} />
          <Route path='watch-list' element={<WatchListPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}