import React from 'react';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from 'redux/contacts/contactsApi';
import { useSelector } from 'react-redux';
import s from './ContactList.module.css';
import { getFilter } from 'redux/contacts/contacts-selectors';
export default function ContactList() {
  const filter = useSelector(getFilter);
  const { data } = useFetchContactsQuery();
  const [deleteContacts] = useDeleteContactMutation();
  console.log(data);
  const updateFilter = () => {
    return data.filter(element => element.name.toLowerCase().includes(filter));
  };
  let contacts = filter === '' ? data : updateFilter();

  return (
    <ul>
      {contacts &&
        contacts.map(({ id, name, phone }) => (
          <li key={id}>
            <p>
              {name}: {phone}
              <button onClick={() => deleteContacts(id)} className={s.button}>
                Delete
              </button>
            </p>
          </li>
        ))}
    </ul>
  );
}
