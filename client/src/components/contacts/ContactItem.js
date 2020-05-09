import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import contactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const {
        deleteContact,
        setCurrentContact,
        clearCurrentContact
    } = useContext(contactContext);
    const { name, _id, mobile, email, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrentContact();
    };
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional'
                            ? 'badge-success'
                            : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open'> {email}</i>
                    </li>
                )}
                {mobile && (
                    <li>
                        <i className='fas fa-phone'> {mobile}</i>
                    </li>
                )}
            </ul>
            <button
                className='btn btn-dark btn-sm'
                onClick={() => setCurrentContact(contact)}
            >
                Edit
            </button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};
export default ContactItem;
