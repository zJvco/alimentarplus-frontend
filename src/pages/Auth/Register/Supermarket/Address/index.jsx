import React from 'react'
import InputField from '../../../../../components/Form/InputField'
import RadioField from '../../../../../components/Form/RadioField'
import InputGroup from '../../../../../components/Form/InputGroup'
import Button from '../../../../../components/Form/Button'
import { BackgroundColor, Container, Title, ProgressBar, Subtitle, FormContainer, Footer, FooterContent, Logo, Header, ProgressBarContainer } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { updateLocalStorageData } from '../../../../../utils/helpers'
import UseRedirect from '../../../../../hooks/useRedirect'

function Address() {
    UseRedirect()
    
    const navigate = useNavigate()

    const [data, setData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        updateLocalStorageData({"addressData": data})

        navigate("/cadastro/supermercado/planos")
    }

    return (
        <BackgroundColor>
            <Header>
                <Logo>Alimentar+</Logo>
            </Header>

            <ProgressBarContainer>
                <ProgressBar style={{ width: "50%" }} />
            </ProgressBarContainer>

            <Container>
                <Title>Endereço do estabelecimento</Title>
                <Subtitle>Preencha as informações de endereço do seu estabelecimento.</Subtitle>

                <FormContainer onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputField
                            label="Endereço"
                            placeholder="Ex: Rua Manoel Gonçalves"
                            type="text"
                            onChange={(e) => setData({...data, street: e.target.value})}
                        />
                        <InputField
                            label="Número"
                            placeholder="Ex: 30"
                            type="text"
                            marginLeft="10px"
                            onChange={(e) => setData({...data, number: e.target.value})}
                        />
                    </InputGroup>
                    <InputField
                        label="Complemento"
                        placeholder="Ex: Ao lado da sorveteria "
                        type="tel"
                        onChange={(e) => setData({...data, complement: e.target.value})}
                    />
                    <InputGroup>
                        <InputField
                            label="Bairro"
                            placeholder="Ex: Jardim Paraná"
                            type="text"
                            onChange={(e) => setData({...data, neighborhood: e.target.value})}
                        />
                        <InputField
                            label="CEP"
                            placeholder="00000-00"
                            type="text"
                            marginLeft="10px"
                            onChange={(e) => setData({...data, zip_code: e.target.value})}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputField
                            label="Estado"
                            placeholder="Ex: São Paulo"
                            type="text"
                            onChange={(e) => setData({...data, state: e.target.value})}
                        />
                        <InputField
                            label="Cidade"
                            placeholder="Ex: Osasco"
                            type="text"
                            marginLeft="10px"
                            onChange={(e) => setData({...data, city: e.target.value})}
                        />
                    </InputGroup>
                    <Button type="submit">Continuar</Button>
                </FormContainer>
            </Container>

            <Footer>
                <FooterContent className='footer-text'>Alimentar+ ©2023 Copyright. Todos os direitos reservados.</FooterContent>
            </Footer>
        </BackgroundColor>
    )
}

export default Address