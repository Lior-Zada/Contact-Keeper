import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
    const initialState = [];
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Create Alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = Math.floor(Math.random() * Math.floor(1000));

        dispatch({ type: SET_ALERT, payload: { msg, type, id } });

        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };

    // Remove Alert
    const removeAlert = () => {
        dispatch({ type: REMOVE_ALERT, payload: null });
    };

    return (
        <AlertContext.Provider value={{ alerts: state, setAlert, removeAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
