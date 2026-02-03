import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../redux/selectors';
import { LogOut, setToken } from '../redux/AuthSlice';
import { useEffect } from 'react';
import { GetUser, SetAuthHeader } from '../redux/operation';

const Profile = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if(token) {
          SetAuthHeader(token);
          dispatch(setToken(token));
          dispatch(GetUser());

          window.history.replaceState({}, '', '/profile');
    }
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(LogOut())
    window.location.href = 'http://localhost:5173'
  }
  return (
    <div>
      <h2>Profile</h2>

      <h3>Information</h3>

      <ul style={{ listStyle: 'none' }}>
        <li>{user.username}</li>
        <li>{user.email}</li>
      </ul>

      <button onClick={() => handleLogOut()}>LogOut</button>
    </div>
  );
};

export default Profile;
