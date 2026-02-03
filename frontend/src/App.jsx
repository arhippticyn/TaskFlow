import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom'
import { selectIsLogin } from './redux/selectors.js';

const HomePage = lazy(() => import('./page/Home.jsx'))
const RegisterPage = lazy(() => import('./page/Register.jsx'))
const LoginPage = lazy(() => import('./page/Login.jsx'));
const ProfilePage = lazy(() => import('./page/Profile.jsx'))

function App() {
  const Islogin = useSelector(selectIsLogin) 

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
          {Islogin && (
            <NavLink
              style={{ color: 'black', textDecoration: 'none' }}
              to="/profile"
            >
              Profile
            </NavLink>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App
