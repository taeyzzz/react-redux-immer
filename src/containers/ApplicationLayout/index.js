import React, { useState, useCallback, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect, useSelector, shallowEqual } from 'react-redux'
import { createSelector } from 'reselect'

import useActions from '../../hooks/useActions'
import * as ApplicationActions from '../../actions/application'

import TodoForm from '../../components/TodoForm/Loadable'
import Button from '../../components/Button/Loadable'

import useFormInput from '../../components/TodoForm/hooks/useFormInput'

import ApplicationStyled from './styled'

const Application = () => {
  const listTodo = useSelector(state => state.application.listTodo, shallowEqual)
  const loadStatus = useSelector(state => state.application.loadListTodo.fetchStatus, shallowEqual)
  const actions = useActions(Object.assign({}, ApplicationActions))

  useEffect(() => {
    actions.loadListTodo()
  }, [])

  const [todoTitle, isTodoValid, updateTodo] = useFormInput()

  const handleDONE = useCallback((index) => {
    actions.updateTodo(index)
  }, [])

  const renderList = () => {
    return listTodo.map((obj, index) => {
      const btn = (
        <Button
          data={index}
          text="DONE"
          onClick={handleDONE}
        />
      )
      return (
        <div style={{display: "flex"}} key={index}>
          <div>{obj.done ? "DONE" : "GOING"} ===> {obj.title}</div>
          {!obj.done && btn}
        </div>
      )
    })
  }

  const handleInputChanged = useCallback((e, value) => {
    updateTodo(value)
  })

  const handleAddClicked = useCallback(() => {
    actions.addTodo(todoTitle)
    updateTodo("")
  }, [todoTitle])

  console.log("render application");
  return (
    <div>
      <TodoForm
        inputValue={todoTitle}
        onInputChanged={handleInputChanged}
        onAddClicked={handleAddClicked}
        disabled={!isTodoValid}
      />
      <div>
        TODO List : {loadStatus === "request" ? "Loading..." : "Idle"}
      </div>
      <div>
        {renderList()}
      </div>
    </div>
  )
}

export default Application

// class Application extends React.Component{
//   state = {
//     todoTitle: ""
//   }
//
//   handleDONE = (index) => {
//     this.props.updateTodo(index)
//   }
//
//   renderList = () => {
//     return this.props.application.listTodo.map((obj, index) => {
//       return (
//         <div style={{display: "flex"}} key={index}>
//           <div>{obj.done ? "DONE" : "GOING"} ===> {obj.todo}</div>
//           <Button
//             data={index}
//             text="DONE"
//             onClick={this.handleDONE}
//           />
//         </div>
//       )
//     })
//   }
//
//   handleInputChanged = (e, value) => {
//     this.setState({
//       todoTitle: value
//     })
//   }
//
//   handleAddClicked = () => {
//     this.props.addTodo(this.state.todoTitle)
//     this.setState({
//       todoTitle: ""
//     })
//   }
//
//   render(){
//     console.log("render Application");
//     return (
//       <div>
//         <TodoForm
//           inputValue={this.state.todoTitle}
//           onInputChanged={this.handleInputChanged}
//           onAddClicked={this.handleAddClicked}
//         />
//         <div>
//           TODO List
//         </div>
//         <div>
//           {this.renderList()}
//         </div>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = state => {
// 	return {
// 		application: state.application
// 	}
// }
//
// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators(Object.assign({},
// 		ApplicationActions
// 	), dispatch)
// }
//
// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Application)
