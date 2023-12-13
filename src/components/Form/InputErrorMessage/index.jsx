import React from 'react'
import styled from 'styled-components'

function InputErrorMessage({
    error
}) {
  return (
    <ErrorMessage>*{error}</ErrorMessage>
  )
}

const ErrorMessage = styled.span`
  display: flex;
  color: red;
  font-size: 0.8rem;
  margin: 5px 0;
`

export default InputErrorMessage