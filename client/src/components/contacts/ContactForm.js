import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        mobile: '',
        type: 'personal'
    });

    const {
        currentContact,
        addContact,
        updateCurrentContact,
        clearCurrentContact
    } = contactContext;

    useEffect(() => {
        if (currentContact !== null) {
            setContact(currentContact);
        } else {
            clearAll();
        }
        // eslint-disable-next-line
    }, [currentContact]);

    const { name, email, mobile, type } = contact;

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (currentContact !== null) {
            updateCurrentContact(contact);
        } else {
            addContact(contact);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrentContact();

        setContact({
            name: '',
            email: '',
            mobile: '',
            type: 'personal'
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {currentContact !== null ? 'Update Contact' : 'Add Contact'}
            </h2>
            <input
                type='text'
                placeholder='name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='mobile'
                name='mobile'
                value={mobile}
                onChange={onChange}
            />
            <h5>Contact type</h5>
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            />{' '}
            Personal{' '}
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
            Professional{' '}
            <div>
                <input
                    type='submit'
                    value={
                        currentContact !== null
                            ? 'Update Contact'
                            : 'Add Contact'
                    }
                    className='btn btn-primary btn-block'
                />
            </div>
            {currentContact !== null && (
                <div>
                    <button
                        className='btn btn-light btn-block'
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
