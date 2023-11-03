import React, { Component } from 'react';
import css from './ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class ContactForm extends Component {
 state = {
    name: '',
    number: '',
    };

handleChange = name => event=> {
    const { target } = event;

    this.setState(() => ({
      [name]: target.value,
    }));
    };
    

handleSubmit = (event) => {
    event.preventDefault();
  // console.log('submited')
  
 if (
      this.props.contacts.some(
        contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
      )
    ) {
      Notify.warning(`${this.state.name} is alredy in your contacts`);
      return;
    }

    if (this.state.number && this.state.name) {
      this.props.createUser(this.state);
      this.setState({ number: '', name: '' });
    };
    
}

  render() {
    return (
        <form className={css.contactForm} onSubmit={this.handleSubmit}>
            <label ><p>Name:</p>
                <input
                    className={css.inputName}
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required /></label>
            <label>
          <p>Number:</p>
          <input
            className={css.inputNumber}
            type="tel"
            value={this.state.number}
            onChange={this.handleChange('number')}
            name="number"
            pattern="\+?\d{1,4}?[.\-\s]?\(?\d{1,3}?\)?[.\-\s]?\d{1,4}[.\-\s]?\d{1,4}[.\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
            <button type='submit' className={css.addBtn}>Add contact</button>
        </form>
    )
  }
}



export default ContactForm
