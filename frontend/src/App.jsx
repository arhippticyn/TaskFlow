import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Routes, Route } from 'react-router-dom';
import { selectIsLogin } from './redux/selectors.js';

const HomePage = lazy(() => import('./page/Home.jsx'));
const RegisterPage = lazy(() => import('./page/Register.jsx'));
const LoginPage = lazy(() => import('./page/Login.jsx'));
const ProfilePage = lazy(() => import('./page/Profile.jsx'));
const TasksPage = lazy(() => import('./page/Tasks.jsx'));

function App() {
  const Islogin = useSelector(selectIsLogin);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <nav style={{ display: 'flex', columnGap: '13px' }}>
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
            <div style={{ display: 'flex', columnGap: '13px' }}>
              <NavLink
                style={{ color: 'black', textDecoration: 'none' }}
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink
                style={{ color: 'black', textDecoration: 'none' }}
                to="/tasks"
              >
                My Tasks
              </NavLink>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
