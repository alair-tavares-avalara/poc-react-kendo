import { FETCH_AGAST_SUCCESS, FETCH_LIST_AGAST_SUCCESS, SAVE_AGAST_SUCCESS } from '../constants/actionTypes';
import initialState from "../reducers/initialState";

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export function agastReducer(state = initialState.agastList, action) {
    switch (action.type) {
        case FETCH_AGAST_SUCCESS:
            return {
                admin: action.body.admin,
                agasts: action.body.agasts,
                totalCount: Number(action.body.numPages || 0), //check in API, fetch record count instead total Pages.
                page: Number(action.body.page || 0) - 1,
                rowsPerPage: Number(action.body.pageSize || 0)
            };

        case FETCH_LIST_AGAST_SUCCESS:
            return action.body;

        default:
            return state;
    }
}

export function agastSaveReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_AGAST_SUCCESS:
            return action.body;

        default:
            return state;
    }
}