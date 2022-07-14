import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './filter/Filter';
import Phonebook from './phonebook/Phonebook'
import Contacts from './contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  getFilterContact = () => {
    const { contacts, filter } = this.state;
    const filterNormalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
  };

  checkContact = newContact => {
    const { contacts } = this.state;
    return contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  addContact = newContact => {
    if (this.checkContact(newContact)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    const verifiedNewContact = { id: nanoid(), ...newContact };
    this.setState(ev => ({
      contacts: [...ev.contacts, verifiedNewContact],
    }));
  };

  deleteContact = id => {
    this.setState(ev => ({
      contacts: ev.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getFilterContact();
    return (
      <div>
        <div>
          <Phonebook onRiseContact={this.addContact} />
        </div>

        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <Contacts
            contacts={visibleContacts}
            onDeleteContacts={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

