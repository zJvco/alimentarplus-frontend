import React from 'react'
import styled from 'styled-components'

function Button({
  children,
  onClick,
  margin,
  type,
}) {
  return (
    <ButtonInput type={type} onClick={onClick} style={{ margin: margin }}>
      { children }
    </ButtonInput>
  )
}

const ButtonInput = styled.button`
    width: 100%;
    border: none;
    outline: none;
    background-color: ${props => props.theme.colors.primary};
    padding: 10px;
    margin: 20px 0;
    cursor: pointer;
    color: #FFFFFF;
    border-radius: 5px;

    &:hover {
      background-color: ${props => props.theme.colors.secondary};
    }
`

export default Button