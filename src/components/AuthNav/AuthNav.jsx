import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';

const AuthNav = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <nav className={styles.navigation}>
      {!isLoggedIn ? (
        <>
          <NavLink to="/register" className={styles.navA}>
            Registration
          </NavLink>
          <NavLink to="/login" className={styles.navA}>
            Log In
          </NavLink>
        </>
      ) : (
        <UserMenu />
      )}
    </nav>
  );
};

export default AuthNav;
