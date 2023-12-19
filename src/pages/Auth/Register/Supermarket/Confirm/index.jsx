import React, { useState } from 'react'
import { BackgroundColor } from '../../styles'
import { ProgressBar, ProgressBarContainer, Header, Logo, Container, Title, Subtitle } from '../../styles'
import styled from 'styled-components'
import { FaPenToSquare } from 'react-icons/fa6'
import Button from '../../../../../components/Form/Button'
import { getLocalStorageData, getFormatedRegisterDataJSONResponse } from '../../../../../utils/helpers'
import { useMutation } from 'react-query'
import { useEffect } from 'react'
import api from '../../../../../api/config'
import { notify } from '../../../../../utils/notify'
import { useNavigate } from 'react-router-dom'
import UseRedirect from '../../../../../hooks/useRedirect'

const mockedTitleData = ["Dados do Responsável", "Dados do Estabelecimento", "Endereço do Estabelecimento", "Plano Selecionado"]

function Confirm() {
  const navigate = useNavigate()

  const handleEditButton = () => {
  }

  const mutation = useMutation({
    mutationFn: () => {
      return api.post("/auth/register?type=supermarket", getFormatedRegisterDataJSONResponse(getLocalStorageData(), "supermarket"))
    },
    onSuccess: () => {
      notify("Dados cadastrados com sucesso", "success")
      navigate("/login")
    },
    onError: (err) => {
      notify("Erro no servidor", "error")
    }
  })

  return (
    <BackgroundColor>
      <Header>
        <Logo>Alimentar+</Logo>
      </Header>

      <ProgressBarContainer>
        <ProgressBar style={{ width: "100%" }} />
      </ProgressBarContainer>

      <Container>
        <Title>Confirmação dos dados</Title>
        <Subtitle >
          Confirme se todos os seus dados estão corretos.
        </Subtitle>

        <InformationsContainer>
          {Object.keys(getLocalStorageData()).map((item, index) => {
            return (
              <InformationSection>
                <SectionTitle style={{ display: 'inline-block', verticalAlign: "middle" }}>
                  {mockedTitleData[index]}
                  <EditButton onClick={handleEditButton}>
                    <FaPenToSquare />
                  </EditButton>
                </SectionTitle>
                <SectionInformationList>
                  {Object.values(getLocalStorageData()[item]).map((value) => {
                    return (
                      <SectionInformationItem>{value}</SectionInformationItem>
                    )
                  })}
                </SectionInformationList>
              </InformationSection>
            )
          })}

        </InformationsContainer>

        <Button margin="0" onClick={() => mutation.mutate()}>Cadastrar o meu supermercado</Button>
      </Container>
    </BackgroundColor>
  )
}

const InformationsContainer = styled.div`
  margin: 40px 0;
`

const InformationSection = styled.div`
  margin: 20px 0;
`

const SectionTitle = styled.h5`
  font-weight: bold;
  font-size: 1rem;
`

const SectionInformationList = styled.ul`
  list-style-type: none;
  margin: 10px 0 0 20px;
`

const SectionInformationItem = styled.li`
  margin: 8px 0;
`

const EditButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  display: inline-block;
  vertical-align: middle;
  color: ${props => props.theme.colors.primary};
`

export default Confirm