import { FETCH_AGAST_SUCCESS } from '../constants/actionTypes';

const agastList = {
    admin: false,
    agasts: [],
    numPages: 0,
    page: 0,
    pageSize: 0
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function agastReducer(state = agastList, action) {
    switch (action.type) {
        case FETCH_AGAST_SUCCESS:
            return {
                admin: action.body.admin,
                agasts: action.body.agasts,
                totalCount: Number(action.body.numPages || 0), //check in API, fetch record count instead total Pages.
                page: Number(action.body.page - 1 || 0),
                rowsPerPage: Number(action.body.pageSize || 0)
            };

        default:
            return state;
    }
}
