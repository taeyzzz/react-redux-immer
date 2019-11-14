import produce from 'immer';

const initialState = {
	listTodo: [],
	loadListTodo: {
		fetchStatus: "idle"
	}
}

const application = (state = initialState, action) => {
	switch (action.type) {
		case "LOAD_LIST_TODO_REQUEST": {
			return produce(state, draft => {
				draft.loadListTodo.fetchStatus = "request"
		  })
			break;
		}
		case "LOAD_LIST_TODO_SUCCESS": {
			return produce(state, draft => {
				draft.loadListTodo.fetchStatus = "success"
				draft.listTodo = action.payload.listTodo
		  })
			break;
		}
		case "UPDATE_TODO": {
			return produce(state, draft => {
				draft.listTodo[action.payload.index].done = true
		  })
			break;
		}
		case "ADD_TODO": {
			const prepared = {
				title: action.payload.text,
				done: false
			}
			return produce(state, draft => {
				draft.listTodo = [...state.listTodo, prepared]
		  })
			break;
		}
		default:
			return state
	}
}

export default application
