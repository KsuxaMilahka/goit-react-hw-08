import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <nav className={styles.nav}>
      <NavLink className={styles.navA} to="/" end>
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink className={styles.navA} to="/contacts">
            Contacts
          </NavLink>
          <UserMenu />
        </>
      ) : (
        <AuthNav />
      )}
    </nav>
  );
};

export default Navigation;
