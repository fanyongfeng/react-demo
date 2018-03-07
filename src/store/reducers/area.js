import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '@constants/ActionTypes';

const initialState = {
  areasDomain: [],
  domainsInfo: []
};

const area = {
  [actionTypes.REC_AREA_LIST](state, { payload }) {
    return {...state, areasDomain: payload.areasDomain}
  },
  [actionTypes.REC_DOMAIN_INFO](state, { payload }) {
    return {...state, domainsInfo: [...state.domainsInfo, ...payload.domainsInfo]}
  }
};



export default createReducer(initialState, area);