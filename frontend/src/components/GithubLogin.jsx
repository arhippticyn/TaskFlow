import { FaSquareGithub } from 'react-icons/fa6';

const GithubLogin = () => {
  return (
    <button
    style={{width: '200px', height: '40px', fontSize: '18px'}}
      onClick={() =>
        (window.location.href = 'http://127.0.0.1:8000/auth/github/login')
      }
    >
        log in with GitHub <FaSquareGithub  />
    </button>
  );
};

export default GithubLogin;
