import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/contactsSlice';

import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleDeleteContact = contactId => {
    const thunk = deleteContact(contactId);
    dispatch(thunk);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul className={styles.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.contactItem}>
          <Contact
            id={id}
            name={name}
            number={number}
            onDeleteContact={() => handleDeleteContact(id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
