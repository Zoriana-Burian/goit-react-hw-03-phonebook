import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, OnDeleteContact }) => (
    <ul className={s.contactList}>
        {contacts.map(({ id, name, number }) => (
            <li className={s.contacts} key={id}>
                <p className={s.name}>{name}:</p>
                <p className={s.number}>{number}</p>
                <button type='button' onClick={() => OnDeleteContact(id)} className={s.button}>Delete</button>
            </li>
        ))}
    </ul>
);

ContactList.propType = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })),
    OnDeleteContact: PropTypes.func.isRequired,
}

export default ContactList;