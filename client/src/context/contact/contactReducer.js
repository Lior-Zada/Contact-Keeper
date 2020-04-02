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

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
            break;
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
            break;
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                currentContact: null,
                error: null
            };
            break;
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => {
                    return action.payload !== contact._id;
                }),
                loading: false
            };
            break;
        case SET_CURRENT:
            return {
                ...state,
                currentContact: action.payload
            };
            break;
        case CLEAR_CURRENT:
            return {
                ...state,
                currentContact: null
            };
            break;
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload._id
                        ? action.payload
                        : contact
                ),
                loading: false
            };
            break;
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(action.payload, 'gi');
                    return (
                        contact.name.match(regex) || contact.email.match(regex)
                    );
                })
            };
            break;
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
            break;
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
            break;

        default:
            break;
    }
};
