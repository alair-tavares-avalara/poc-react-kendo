import * as types from '../constants/actionTypes';

import {getFormattedDateTime} from '../utils/dates';

function fetchAgastRequest() {
  return {
    type: types.FETCH_AGAST_REQUEST
  };
}

function fetchAgastSuccess(body) {
  return {
    type: types.FETCH_AGAST_SUCCESS,
    body
  };
}

function fetchAgastFailure(ex) {
  return {
    type: types.FETCH_AGAST_FAILURE,
    ex
  };
}

function saveAgastRequest() {
  return {
    type: types.SAVE_AGAST_REQUEST
  };
}

function saveAgastSuccess(body) {
  return {
    type: types.SAVE_AGAST_SUCCESS,
    body
  };
}

function saveAgastFailure(ex) {
  return {
    type: types.SAVE_AGAST_FAILURE,
    ex
  };
}

export function fetchAgast() {
  const url = 'http://www.mocky.io/v2/5a6224f2310000122cde7f24';

  return dispatch => {
    dispatch(fetchAgastRequest());
    return fetch(url)
      .then(res => res.json())
      .then(body => dispatch(fetchAgastSuccess(body)))
      .catch(ex => dispatch(fetchAgastFailure(ex)));
  };
}

export function saveAgast() {
  const url = 'http://www.mocky.io/v2/5a6224f2310000122cde7f24';

  return dispatch => {
    dispatch(saveAgastRequest());
    return fetch(url)
      .then(res => res.json())
      .then(body => dispatch(saveAgastSuccess(body)))
      .catch(ex => dispatch(saveAgastFailure(ex)));
  };
}