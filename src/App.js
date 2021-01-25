//import logo from './logo.svg';
import './App.css';
import React from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import shortid from 'shortid';
import Filter from './components/Filter/Filter';


class App extends React.Component {
  state = {
    contacts: [],
     
    filter: ''
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(PrevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
    
  }
  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };


 addContact = ({ name, number }) => {
   
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (contacts.find( contact => contact.name.toLowerCase() === name.toLowerCase(),)) {
      alert(`${name} is already in contacts.`);
    
    } else {
      this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
      }));
    }
  };
  

  changeFilter = event => {
    this.setState({filter: event.currentTarget.value})
  }
    
    
 visibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };


  render() {
    const { filter } = this.state;
    
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter}/>
         <h2>Contacts</h2>
        <ContactList contacts={this.visibleContacts()} OnDeleteContact={this.deleteContacts}/>
   
    </div>
    )
    
  }
};

export default App;
