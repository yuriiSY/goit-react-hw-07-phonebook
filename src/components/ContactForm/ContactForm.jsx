import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContacts } from '../../redux/contacts/contacts-operartion';

import { nanoid } from 'nanoid';
import css from './contactForm.module.css';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const [constact, setContact] = useState({
    ...INITIAL_STATE,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;
    setContact({
      ...constact,
      [name]: value,
    });
  };

  const onAddContact = e => {
    e.preventDefault();
    dispatch(addContacts(constact));
    reset();
  };

  const reset = () => {
    setContact({ ...INITIAL_STATE });
  };

  const { name, phone } = constact;

  const nameId = nanoid();
  const phoneId = nanoid();

  return (
    <form className={css.form} onSubmit={onAddContact}>
      <div className={css.formGroup}>
        <label htmlFor={nameId}>Name</label>
        <input
          ref={inputRef}
          onChange={handleChange}
          id={nameId}
          type="text"
          name="name"
          value={name}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={phoneId}>Phone</label>
        <input
          onChange={handleChange}
          id={phoneId}
          type="text"
          name="phone"
          value={phone}
          required
        />
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
