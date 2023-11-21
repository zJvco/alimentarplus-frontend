import React from 'react'
import { ClipLoader } from 'react-spinners'
import theme from '../../theme'
import styled from 'styled-components'

function CircularLoader({
  style
}) {
  return (
    <Container style={style}>
      <ClipLoader
          color={theme.colors.primary}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 20px 0;
`

export default CircularLoader