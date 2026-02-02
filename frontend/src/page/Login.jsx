import { useDispatch } from 'react-redux';
import styles from '../styles/Login.module.css';
import { LoginUser } from '../redux/operation';

const Login = () => {
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target
    const username = form.elements.username.value
    const password = form.elements.password.value
    dispatch(LoginUser({username: username, password:password}))
    form.reset()
  }
  return (
    <div>
      <h1 className={styles.title}>Login</h1>

      <form action="" onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="" className={styles.label}>
          Enter Username:
        </label>
        <input type="text" className={styles.input} name="username" />
        <label htmlFor="" className={styles.label}>
          Enter Password:
        </label>
        <input type="password" name="password" id="" className={styles.input} />

        <button className={styles.btn}>Log In</button>
      </form>
    </div>
  );
};

export default Login;
