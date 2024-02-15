import css from './contactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/contacts-selectors';
import {
  fetchContacts,
  deleteContacts,
} from '../../redux/contacts/contacts-operartion';
import { useEffect } from 'react';

const ContactList = () => {
  const { items, loading, error } = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContacts(id));
  };

  const elements = items.map(({ id, name, phone }) => (
    <li key={id}>
      {name}:{phone}
      <button
        className={css.button}
        onClick={() => onDeleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {Boolean(items.length) && <ul className={css.list}>{elements}</ul>}
    </>
  );
};

export default ContactList;
