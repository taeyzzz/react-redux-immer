import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'

import ButtonStyled from './styled'

const Button = (props) => {
  const handleClicked = () => {
    props.onClick && props.onClick(props.data)
  }

  console.log("render Button");
  return (
    <ButtonStyled onClick={handleClicked}>
      {props.text}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  text: ""
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

export default memo(Button)
