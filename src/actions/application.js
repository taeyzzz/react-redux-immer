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

export const addTodo = (text) => {
  return async dispatch => {
    dispatch({
      type: "ADD_TODO",
      payload: {
        text
      }
    })
  }
}

export const loadListTodo = () => {
  return async dispatch => {
    dispatch({
      type: "LOAD_LIST_TODO_REQUEST",
    })
    try {
      const listTodo = await get("http://jsonplaceholder.typicode.com/users/1/todos")
      dispatch({
        type: "LOAD_LIST_TODO_SUCCESS",
        payload: {
          listTodo
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }
}
