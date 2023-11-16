import React from 'react'
import styled from 'styled-components'

function Divisor() {
  return (
    <Container />
  )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.borderColor};
    margin: 10px 0;
`

export default Divisor