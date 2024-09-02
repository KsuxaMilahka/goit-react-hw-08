import styles from './Contact.module.css';
import { ImUsers } from 'react-icons/im';
import { FaPhoneAlt } from 'react-icons/fa';

const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <div className={styles.contact}>
      <div className={styles.info}>
        <p className={styles.name}>
          <ImUsers className={styles.icon} />
          {name}
        </p>
        <p className={styles.number}>
          <FaPhoneAlt className={styles.icon} />
          {number}
        </p>
      </div>
      <button
        onClick={() => onDeleteContact(id)}
        type="button"
        className={styles.deleteBtn}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
