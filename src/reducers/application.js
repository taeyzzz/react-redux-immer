import produce from 'immer';

const initialState = {
	listTodo: [
    {
  		todo: "Learn typescript",
  		done: true
  	},
    {
  		todo: "Try immer",
  		done: false
  	}
  ]
}

const application = (state = initialState, action) => {
  console.log(state);
  // const newState = produce(state, draft => {
  //   console.log(state);
  //   switch (action.type) {
  //     case "UPDATE_TODO": {
  //       draft.listTodo[action.payload.index].done = true
  //       break;
  //     }
  // 	}
  // })
  // console.log(newState);
  // return newState
  switch (action.type) {
    case "UPDATE_TODO": {
      const newState = Object.assign({}, state, {
        listTodo: state.listTodo.map((obj, index) => {
          if(index === action.payload.index){
            return Object.assign({}, obj, {
              done: true
            })
          }
          return obj
        })
      })
      // const newState = state
      // newState.listTodo[action.payload.index].done = true
      console.log(newState);
      return newState
      break;
    }
    default:
  	return state
  }
}

export default application
