import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ApplicationActions from '../../actions/application'
import ApplicationStyled from './styled'

class Application extends React.Component{
  handleDONE = (index) => {
    this.props.updateTodo(index)
  }

  renderList = () => {
    console.log(this.props.application.listTodo);
    return this.props.application.listTodo.map((obj, index) => {
      return (
        <div style={{display: "flex"}} key={index}>
          <div>{obj.done ? "DONE" : "GOING"} ===> {obj.todo}</div>
          <button onClick={() => this.handleDONE(index)}>DONE</button>
        </div>
      )
    })
  }

  render(){
    return (
      <div>
        <div>
          TODO List
        </div>
        <div>
          {this.renderList()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
	return {
		application: state.application
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(Object.assign({},
		ApplicationActions
	), dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Application)
