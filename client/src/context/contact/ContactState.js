import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
    GET_CONTACTS,
    ADD_CONTACT,
    CLEAR_CONTACTS,
    CONTACT_ERROR,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        currentContact: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contacts
    const getContacts = async () => {
        try {
            const result = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: result.data.contacts });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    // Clear contacts
    // The purpose of this is when logging out and relogging with a different user,
    //  the contacts of the previous user are saved in the state. this will clean them up upon logout
    const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

    // Add Contact
    const addContact = async contact => {
        try {
            const result = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: '/api/contacts',
                data: JSON.stringify(contact)
            });
            dispatch({ type: ADD_CONTACT, payload: result.data });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    // Set Current Contact
    const setCurrentContact = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrentContact = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // Update Contact
    const updateCurrentContact = async contact => {
        try {
            await axios.put('/api/contacts', contact);
            dispatch({ type: UPDATE_CONTACT, payload: contact });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
        }
    };
    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                currentContact: state.currentContact,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrentContact,
                clearCurrentContact,
                updateCurrentContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
