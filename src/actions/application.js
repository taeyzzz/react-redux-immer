import { get } from '../utils'

export const updateTodo = (index) => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        index
      }
    })
  }
}
