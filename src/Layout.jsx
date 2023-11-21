import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Nav from './layout/Nav';
import Header from './layout/Header';

function MainLayout() {
  return (
    <MainContainer>
      <Nav />

      <RightContainer>
        <Header />

        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </RightContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
    display: flex;
`

const RightContainer = styled.div`
    margin-left: 120px;
    width: 100%;

`

const ContentContainer = styled.div`
  padding: 20px;
`

export default MainLayout