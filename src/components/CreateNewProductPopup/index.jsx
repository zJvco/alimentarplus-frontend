import React from 'react'
import style from './styles'
import CloseButton from '../CloseButton'
import InputField from '../Form/InputField'
import InputGroup from '../Form/InputGroup'
import TextField from '../Form/TextField'
import Button from '../Form/Button'

function CreateNewProductPopup({
  isOpen,
  setIsOpen
}) {
  const handleClosePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <style.TransparentBackground>
      <style.Container>
        <style.Header>
          <style.Title>Cadastrar novo produto</style.Title>
        </style.Header>

        <style.Form>

          <InputGroup>
            <InputField label="Nome" placeholder="Insira o nome do seu produto" />
            <InputField label="Marca" marginLeft="10px" placeholder="Insira a marca do seu produto" />
          </InputGroup>

          <InputGroup>
            <InputField label="Peso total (kg)" type="number" placeholder="Insira o nome do seu produto" />
            <InputField label="Data de validade" type="date" marginLeft="10px" />
          </InputGroup>

          <InputGroup>
            <InputField label="Peso por unidade (kg)" type="number" placeholder="Insira o peso por unidade" />
            <InputField label="Quantidade de unidades" type="number" marginLeft="10px" placeholder="Insira a quantidade de produtos/embalagens" />
          </InputGroup>

          <TextField label="Descrição" placeholder="Insira uma descrição para o seu produto" rows="10" />

          <style.ActionsContainer>
            <style.CancelButton onClick={handleClosePopup}>Cancelar</style.CancelButton>
            <Button type="submit" style={{ width: "auto" }}>Salvar produto</Button>
          </style.ActionsContainer>

        </style.Form>
      </style.Container>
    </style.TransparentBackground>
  )
}

export default CreateNewProductPopup