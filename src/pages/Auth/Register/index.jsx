import React, { useEffect } from 'react'
import styled from 'styled-components'
import InputField from '../../../components/Form/InputField'
import RadioField from '../../../components/Form/RadioField'
import InputGroup from '../../../components/Form/InputGroup'
import Button from '../../../components/Form/Button'
import { Link, useNavigate } from 'react-router-dom'
import { BackgroundColor, Container, Title, Subtitle, Footer, FooterContent, FormContainer, Logo, Header  } from './styles'
import { useState } from 'react'
import { setLocalStorageData } from '../../../utils/helpers'
import UseRedirect from '../../../hooks/useRedirect'

function Register() {
  UseRedirect()

  const navigate = useNavigate()

  const [isOng, setIsOng] = useState(false)
  const [data, setData] = useState({})

  const handleCadastroSubmit = (e) => {
    e.preventDefault()

    setLocalStorageData({"userData": data})

    if (isOng === false) {
      navigate("/cadastro/supermercado/informacoes")
    }
    else if (isOng === true) {
      navigate("/cadastro/ong/informacoes")
    }
    else {
      // 
    }
  }

  return (
    <BackgroundColor>
      <Header>
        <Logo>Alimentar+</Logo>
      </Header>

      <Container>
        <Title>Faça o cadastro</Title>
        <Subtitle>Informações do responsável do supermercado ou da ONG.</Subtitle>

        <FormContainer onSubmit={handleCadastroSubmit}>
          <InputField
            label="Nome completo"
            placeholder="Nome completo do responsável"
            type="text"
            onChange={(e) => setData({...data, name: e.target.value})}
          />
          <InputField
            label="E-mail"
            placeholder="E-mail do responsável"
            type="text"
            onChange={(e) => setData({...data, email: e.target.value})}
          />
          <InputField
            label="Celular"
            placeholder="Celular do responsável"
            type="tel"
            onChange={(e) => setData({...data, phone_number: e.target.value})}
          />
          <InputField
            label="CPF"
            placeholder="000.000.000-00"
            type="text"
            onChange={(e) => setData({...data, cpf: e.target.value})}
          />
          <InputField
            label="Senha"
            placeholder="Escolha uma senha forte"
            type="password"
            onChange={(e) => setData({...data, password: e.target.value})}
          />
          <InputGroup margin="5px 0" >
            <RadioField
              value="Sou um supermercado"
              label="Sou um supermercado"
              id="radio-supermercado"
              name="radio"
              onChange={() => setIsOng(false)}
            />
            <RadioField
              value="Sou uma ONG"
              label="Sou uma ONG"
              id="radio-ong"
              name="radio"
              onChange={() => setIsOng(true)}
            />
          </InputGroup>
          <Button type="submit">Continuar</Button>
        </FormContainer>
        <AlreadyHaveAccount>Já tem uma conta? <Link to="/login" >Faça o login.</Link></AlreadyHaveAccount>
      </Container>

      <Footer>
        <FooterContent className='footer-text'>Alimentar+ ©2023 Copyright. Todos os direitos reservados.</FooterContent>
      </Footer>
    </BackgroundColor>
  )
}

const AlreadyHaveAccount = styled.span`
  width: 100%;
  text-align: center;
  float: right;
`

export default Register