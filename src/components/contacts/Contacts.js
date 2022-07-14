import PropTypes from 'prop-types';
import s from './contacts.module.css';

export default function Contacts({ contacts, onDeleteContacts }) {
    return (
        <div>
                <ul className={s.list}>
                    {contacts.map(({ id, name, number }) => {
                        return (
                            <li className={s.item} key={id}>
                                <p className={s.text}>
                                    {name} : {number};
                                </p>
                                <button
                                    className={s.btn}
                                    type="button"
                                    onClick={() => onDeleteContacts(id)}
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
};