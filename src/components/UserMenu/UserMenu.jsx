import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
