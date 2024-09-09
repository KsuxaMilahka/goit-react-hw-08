import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink className={styles.navA} to="/" end>
        Home
      </NavLink>
      <NavLink className={styles.navA} to="/contacts">
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;
