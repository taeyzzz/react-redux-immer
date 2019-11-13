import produce from 'immer';

const initialState = {
	listTodo: [
    {
  		todo: "Learn typescript",
			done: false
  	},
    {
  		todo: "Try immer",
  		done: false
  	}
  ]
}

const application = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_TODO": {
			return produce(state, draft => {
				draft.listTodo[action.payload.index].done = true
		  })
			break;
		}
		default:
			return state
	}
}

export default application
