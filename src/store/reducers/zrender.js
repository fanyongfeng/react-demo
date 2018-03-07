import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '@constants/ActionTypes';

const initialState = {
  list: []
};

const room = {
  [actionTypes.ADD_RENDER_ITEM](state, { payload }) {
    return {...state, list: payload.roomList}
  },
};



export default createReducer(initialState, room);