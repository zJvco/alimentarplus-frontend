import React from 'react'
import styled from 'styled-components'
import InputField from '../../../../../components/Form/InputField'
import RadioField from '../../../../../components/Form/RadioField'
import InputGroup from '../../../../../components/Form/InputGroup'
import Button from '../../../../../components/Form/Button'
import { Link } from 'react-router-dom'
import { BackgroundColor, Container, Title, Subtitle, Footer, FooterContent, FormContainer, Logo, Header, ProgressBarContainer, ProgressBar } from '../../styles'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { updateLocalStorageData } from '../../../../../utils/helpers'
import UseRedirect from '../../../../../hooks/useRedirect'

function Plan() {
    UseRedirect()

    const navigate = useNavigate()

    const handlePlanClick = (type) => {
        if (type === 0) {
            updateLocalStorageData({"planData": {"type": "free"}})
        }
        else {
            updateLocalStorageData({"planData": {"type": "premium"}})
        }

        navigate("/cadastro/supermercado/confirmar")
    }

    return (
        <BackgroundColor>
            <Header>
                <Logo>Alimentar+</Logo>
            </Header>

            <ProgressBarContainer>
                <ProgressBar style={{ width: "75%" }} />
            </ProgressBarContainer>

            <Container>
                <Title>Planos</Title>
                <Subtitle>Escolha um plano para o seu estabelecimento.</Subtitle>

                <BoxesContainer>
                    <BoxContainer>
                        <BoxTopContent>
                            <BoxHeader>
                                Grátis
                            </BoxHeader>
                            <BoxContentList>
                                <BoxContentItem>Doe alimentos</BoxContentItem>
                                <BoxContentItem>Ajude pessoas</BoxContentItem>
                            </BoxContentList>
                        </BoxTopContent>
                        <BoxBottomContent>
                            <PlanPrice>R$0/mês</PlanPrice>
                            <Button margin="0" onClick={() => handlePlanClick(0)}>Selecionar</Button>
                        </BoxBottomContent>
                    </BoxContainer>

                    <BoxContainer style={{ marginLeft: "10px" }}>
                        <BoxTopContent>
                            <BoxHeader>
                                Premium
                            </BoxHeader>
                            <BoxContentList>
                                <BoxContentItem>Certificado exclusivo</BoxContentItem>
                                <BoxContentItem>Campanha de marketing</BoxContentItem>
                            </BoxContentList>
                        </BoxTopContent>
                        <BoxBottomContent>
                            <PlanPrice>R$39,99/mês</PlanPrice>
                            <Button margin="0" onClick={() => handlePlanClick(1)}>Selecionar</Button>
                        </BoxBottomContent>
                    </BoxContainer>
                </BoxesContainer>
            </Container>

            <Footer>
                <FooterContent className='footer-text'>Alimentar+ ©2023 Copyright. Todos os direitos reservados.</FooterContent>
            </Footer>
        </BackgroundColor>
    )
}

const BoxesContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
`

const BoxContainer = styled.div`
    width: 100%;
    height: 400px;
    padding: 10px;
    background-color: ${props => props.theme.colors.borderColor};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const BoxTopContent = styled.div`
`

const BoxBottomContent = styled.div`
`

const BoxHeader = styled.div`
    text-align: center;
    font-weight: bold;
    margin: 10px 0;
`

const BoxContentList = styled.ul`
    list-style-type: none;
    margin: 20px 10px;
`

const BoxContentItem = styled.li`
    margin: 5px 0;
`

const PlanPrice = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
`

export default Plan