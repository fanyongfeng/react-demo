import {
  ADD_RENDER_ITEM, DELETE_RENDER_ITEM
} from '@constants/ActionTypes';

export const addPath = (path) => ({
  type: ADD_RENDER_ITEM,
  payload: {
    path
  }
});

export const deletePath = (id) => ({
  type: DELETE_RENDER_ITEM,
  payload: {
    id
  }
});