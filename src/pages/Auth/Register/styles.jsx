import styled from "styled-components"

export const BackgroundColor = styled.div`
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 10px;
  width: 620px;
  max-width: 800px;
  margin: auto;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 720px) {
    width: 80%;
    margin: 24px auto;
  }
`

export const Title = styled.h1`
  font-size: 22px;
`

export const Subtitle = styled.p`

`

export const ProgressBarContainer = styled.div`
  display: flex;
  width: calc(98% - 20px);
  height: 5px;
  margin: 0 20px 20px 20px;
  border-radius: 3px;
  background-color: #FFFFFF;
`

export const ProgressBar = styled.div`
  border-radius: 3px;
  background-color: #58D68D;
`

export const Footer = styled.footer`
  text-align: center;
  margin: 15px;
`

export const FooterContent = styled.span`
  color: #FFFFFF;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
`

export const Header = styled.header`
  padding: 20px;
`

export const Logo = styled.img`
  width: 140px;
`