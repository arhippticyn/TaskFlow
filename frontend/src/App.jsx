import { lazy, Suspense } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('./page/Home.jsx'))
const RegisterPage = lazy(() => import('./page/Register.jsx'))
const LoginPage = lazy(() => import('./page/Login.jsx'));

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <nav style={{ display: 'flex', columnGap: '10px' }}>
          <NavLink style={{ color: 'black', textDecoration: 'none' }} to="/">
            Home
          </NavLink>
          <NavLink
            style={{ color: 'black', textDecoration: 'none' }}
            to="/register"
          >
            Register
          </NavLink>
          <NavLink
            style={{ color: 'black', textDecoration: 'none' }}
            to="/login"
          >
            Login
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App
