import * as types from '../constants/actionTypes';
import AgastAPI from '../api/AgastAPI';

const fetchAgastRequest = () => ({ type: types.FETCH_AGAST_REQUEST });
const fetchAgastSuccess = (body) => ({ type: types.FETCH_AGAST_SUCCESS, body });
const fetchAgastFailure = (ex) => ({ type: types.FETCH_AGAST_FAILURE, ex });

const fetchListAgastRequest = () => ({ type: types.FETCH_LIST_AGAST_REQUEST });
const fetchListAgastSuccess = (body) => ({ type: types.FETCH_LIST_AGAST_SUCCESS, body });
const fetchListAgastFailure = (ex) => ({ type: types.FETCH_LIST_AGAST_FAILURE, ex });

const saveAgastRequest = () => ({ type: types.SAVE_AGAST_REQUEST });
const saveAgastSuccess = (body) => ({ type: types.SAVE_AGAST_SUCCESS, body });
const saveAgastFailure = (ex) => ({ type: types.SAVE_AGAST_FAILURE, ex });

export function fetchAgast() {
    return dispatch => {
        dispatch(fetchAgastRequest());
        return AgastAPI.query()
            .then(body => dispatch(fetchAgastSuccess(body)))
            .catch(ex => dispatch(fetchAgastFailure(`Error: ${JSON.stringify(ex)}`)));
    };
}

export function fetchListAgast(searchText) {
    return dispatch => {
        dispatch(fetchListAgastRequest());
        return AgastAPI.list(searchText)
            .then(body => dispatch(fetchListAgastSuccess(body)))
            .catch(ex => dispatch(fetchListAgastFailure(`Error: ${JSON.stringify(ex)}`)));
    };
}

export function saveAgast(body) {
    const url = 'http://www.mocky.io/v2/5a6224f2310000122cde7f24';

    return dispatch => {
        dispatch(saveAgastRequest());
        return fetch(url, {
            body: JSON.stringify(body),
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res, a) => ({ status: res.status, body: res.json() }))
            .then(body => dispatch(saveAgastSuccess(body)))
            .catch(ex => dispatch(saveAgastFailure(`Error: ${JSON.stringify(ex)}`)));
    };
}
