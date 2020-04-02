import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
            break;
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
            break;

        default:
            return state;
            break;
    }
};
