import React from 'react'
import { FaXmark } from 'react-icons/fa6'
import styled from 'styled-components'

function CloseButton({
    onClick,
    style
}) {
  return (
    <Button type="button" onClick={onClick} style={style}>
        <FaXmark />
    </Button>
  )
}

const Button = styled.button`
    display: flex;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
`

export default CloseButton