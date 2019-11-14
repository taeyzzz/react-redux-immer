import React, { useState, useCallback } from 'react'

const useFormInput = (initialState = "") => {
  const [todoTitle, setTodoTitle] = useState(initialState)
  const [isTodoValid, setTodoValid] = useState(undefined)

  const updateTodo = useCallback((value) => {
    setTodoTitle(value)
    setTodoValid(value.length > 0)
  }, [])

  return [todoTitle, isTodoValid, updateTodo]
}

export default useFormInput
