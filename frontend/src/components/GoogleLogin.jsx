import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  return (
    <button
      style={{ width: '200px', height: '40px', fontSize: '18px' }}
      onClick={() =>
        (window.location.href = 'http://127.0.0.1:8000/auth/google/login')
      }
    >
      Log in with Google <FcGoogle />
    </button>
  );
};

export default GoogleLogin;
