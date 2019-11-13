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
    const listTodo = await new Promise(function(resolve, reject) {
      setTimeout(function () {
        resolve([
          {
        		todo: "Learn typescript",
      			done: false
        	},
          {
        		todo: "Try immer",
        		done: false
        	}
        ])
      }, 2000);
    });
    dispatch({
      type: "LOAD_LIST_TODO_SUCCESS",
      payload: {
        listTodo
      }
    })
  }
}
