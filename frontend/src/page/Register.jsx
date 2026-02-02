import styles from '../styles/Register.module.css';
import { useDispatch } from 'react-redux'
import { RegisterUser } from '../redux/operation.js';

const Register = () => {
    const dispatch = useDispatch()
    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target
        const username = form.elements.username.value
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        dispatch(
          RegisterUser({ username: username, email: email, password: password })
        );
        form.reset()
    }
  return (
    <div>
      <h1 className={styles.title}>Register</h1>

      <form action="" className={styles.form} onSubmit={handleRegister}>
        <label htmlFor="" className={styles.label}>
          Enter Username:
        </label>
        <input type="text" className={styles.input} name="username" />
        <label htmlFor="" className={styles.label}>
          Enter Email:
        </label>
        <input type="email" name="email" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Enter Password:
        </label>
        <input type="password" name="password" id="" className={styles.input} />

        <button className={styles.btn}>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
