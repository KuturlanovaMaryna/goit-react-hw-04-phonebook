import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Search from './Search/Search';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const phoneBookContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],

  //   filter: '',
  // };

  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? phoneBookContacts
    );
  });

  const [filter, setFilter] = useState('');

  const handleDeleteUser = id => {
    if (window.confirm('Are you sure?')) {
      setContacts([...contacts.filter(user => user.id !== id)]);
      // this.setState({
      //   contacts: [...this.state.contacts.filter(user => user.id !== id)],
      // });
    }
  };

  const createUser = ({ name, number }) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notify.warning(`${name} is alredy in your contacts`);
      return;
    }

    setContacts([...contacts, { name: name, id: nanoid(), number: number }]);
    // this.setState({
    //   contacts: [
    //     ...this.state.contacts,
    //     { name: data.name, id: nanoid(), number: data.number },
    //   ],
    // });
  };

  const handlerSearch = e => {
    setFilter(e.currentTarget.value);
    // this.setState({ filter: e.currentTarget.value });
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  return (
    <div className={css.appContainer}>
      <h1 className={css.titleText}>Phone book</h1>
      <ContactForm onSubmit={createUser} />
      <p className={css.searchText}>Find contacts by name</p>
      <Search onChange={handlerSearch} value={filter} />
      <ContactList
        handleDeleteUser={handleDeleteUser}
        contacts={contacts}
        filter={filter}
      />
    </div>
  );
};

export default App;
