import React from 'react'
import InputField from '../../../../../components/Form/InputField'
import RadioField from '../../../../../components/Form/RadioField'
import InputGroup from '../../../../../components/Form/InputGroup'
import Button from '../../../../../components/Form/Button'
import { BackgroundColor, Container, Title, ProgressBar, Subtitle, FormContainer, Footer, FooterContent, Logo, Header, ProgressBarContainer } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { updateLocalStorageData } from '../../../../../utils/helpers'
import { useState } from 'react'
import UseRedirect from '../../../../../hooks/useRedirect'

function Information() {
  const navigate = useNavigate()

  const [data, setData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    updateLocalStorageData({"informationData": data})

    navigate("/cadastro/supermercado/endereco")
  }

  return (
    <BackgroundColor>
      <Header>
        <Logo>Alimentar+</Logo>
      </Header>

      <ProgressBarContainer>
        <ProgressBar style={{ width: "25%" }} />
      </ProgressBarContainer>
      
      <Container>
        <Title>Informações do estabelecimento</Title>
        <Subtitle>Preencha as informações do seu estabelecimento.</Subtitle>

        <FormContainer onSubmit={handleSubmit}>
          <InputField
            label="Nome do estabelecimento (Nome Fantasia)"
            placeholder="Como vai aparecer no app. Ex: Carrefour - Guarulhos"
            type="text"
            onChange={(e) => setData({...data, name: e.target.value})}
          />
          <InputField
            label="Razão social"
            placeholder="Ex: Carrefour Mercados LTD."
            type="text"
            onChange={(e) => setData({...data, business_name: e.target.value})}
          />
          <InputField
            label="Inscrição Estadual"
            placeholder="Ex: 000000000"
            type="text"
            onChange={(e) => setData({...data, state_registration: e.target.value})}
          />
          <InputField
            label="Telefone"
            placeholder="Telefone para contato com o estabelecimento"
            type="tel"
            onChange={(e) => setData({...data, phone_number: e.target.value})}
          />
          <InputField
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            type="text"
            onChange={(e) => setData({...data, cnpj: e.target.value})}
          />
          <Button type="submit">Continuar</Button>
        </FormContainer>
      </Container>

      <Footer>
        <FooterContent className='footer-text'>Alimentar+ ©2023 Copyright. Todos os direitos reservados.</FooterContent>
      </Footer>
    </BackgroundColor>
  )
}

export default Information