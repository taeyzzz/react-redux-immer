import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/Loadable'
import Button from '../Button/Loadable'

import TodoFormStyled from './styled'

const TodoForm = (props) => {
  console.log("render TodoForm");
  return (
    <div>
      Form
      <div>
        <Input
          label="Message"
          type="text"
          onChange={props.onInputChanged}
          value={props.inputValue}
        />
      </div>
      <div>
        <Button
          text="ADD"
          onClick={props.onAddClicked}
        />
      </div>
    </div>
  )
}

export default memo(TodoForm)
