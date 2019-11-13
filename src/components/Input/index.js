import React, { memo } from 'react'
import PropTypes from 'prop-types'

import InputStyled from './styled'

const Input = (props) => {
  const handleChanged = (e) => {
    props.onChange && props.onChange(e, e.target.value)
  }

  const getLabel = () => {
    let output = null
    if(props.label){
      output = <span className="label">{props.label}</span>
    }
    return output
  }

  console.log("redner Input");
  return (
    <InputStyled>
      {getLabel()}
      <input
        className="input-component"
        type={props.type}
        onChange={handleChanged}
        value={props.value}
      />
    </InputStyled>
  )
}

Input.defaultProps = {
  label: "",
  type: "text"
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
}

export default memo(Input)
