import React from 'react'
import style from './styles'
import CloseButton from '../CloseButton'
import InputField from '../Form/InputField'
import InputGroup from '../Form/InputGroup'
import TextField from '../Form/TextField'
import Button from '../Form/Button'
import AttachField from '../Form/AttachField'
import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import api from '../../api/config'
import useAuth from '../../hooks/useAuth'
import { notify } from '../../utils/notify'
import { useEffect } from 'react'

function CreateNewProductPopup({
  isOpen,
  setIsOpen
}) {
  const queryClient = useQueryClient()

  const { user, token } = useAuth()
  
  const [formData, setFormData] = useState({})
  const [formProductImageFile, setFormProductImageFile] = useState([])
  const [formProductExpirationDateImageFile, setFormProductExpirationDateImageFile] = useState([])

  const handleClosePopup = () => {
    setIsOpen(!isOpen)
  }

  const uploadFiles = async (files) => {
    const formData = new FormData()

    for (const file of files) {
      formData.append("files", file)
    }

    const response = await api.post("/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      }
    })

    return response.data
  }

  const createProduct = async (data) => {
    const response = await api.post(`/supermarkets/${user.id_supermarket}/products`, JSON.stringify(data), {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    
    return response.data
  }

  const uploadProductImageMutation = useMutation(uploadFiles)
  const uploadProductExpirationDateImageMutation = useMutation(uploadFiles)

  const createProductMutation = useMutation(createProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products")
      notify("Produto cadastrado com sucesso!", "success")
      setIsOpen(!isOpen)
    },
    onError: () => {
      notify("Erro ao cadastrar o produto", "error")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formProductImageFile.length === 0 || formProductExpirationDateImageFile.length === 0) {
      notify("Necessário adicionar arquivos de imagens", "error")
      return
    }

    const uploadProductImageData = await uploadProductImageMutation.mutateAsync(formProductImageFile)
    const uploadProductExpirationDateImageData = await uploadProductExpirationDateImageMutation.mutateAsync(formProductExpirationDateImageFile)
    
    if (uploadProductImageData && uploadProductExpirationDateImageData) {
      createProductMutation.mutate({
        ...formData,
        "url_product_img": uploadProductImageData[0].file_url,
        "url_expiration_date_img": uploadProductExpirationDateImageData[0].file_url
      })
    }
  }

  return (
    <style.TransparentBackground>
      <style.Container>
        <style.Header>
          <style.Title>Cadastrar novo produto</style.Title>
        </style.Header>

        <style.Form onSubmit={handleSubmit}>

          <InputGroup>
            <InputField label="Nome" placeholder="Insira o nome do seu produto" onChange={(e) => setFormData({...formData, "name": e.target.value})} />
            <InputField label="Marca" marginLeft="10px" placeholder="Insira a marca do seu produto" onChange={(e) => setFormData({...formData, "brand": e.target.value})} />
          </InputGroup>

          <InputGroup>
            <InputField label="Peso total (kg)" type="number" placeholder="Insira o nome do seu produto" onChange={(e) => setFormData({...formData, "total_weight_grams": e.target.value})} />
            <InputField label="Data de validade" type="date" marginLeft="10px" onChange={(e) => setFormData({...formData, "expiration_date": e.target.value})} />
          </InputGroup>

          <InputGroup>
            <InputField label="Peso por unidade (kg)" type="number" placeholder="Insira o peso por unidade" onChange={(e) => setFormData({...formData, "unit_weight_grams": e.target.value})} />
            <InputField label="Quantidade de unidades" type="number" marginLeft="10px" placeholder="Insira a quantidade de produtos/embalagens" onChange={(e) => setFormData({...formData, "quantity_units": e.target.value})} />
          </InputGroup>

          <TextField label="Descrição" placeholder="Insira uma descrição para o seu produto" rows="10" onChange={(e) => setFormData({...formData, "description": e.target.value})} />

          <InputGroup>
            <AttachField label="Imagem do produto" files={formProductImageFile} setFiles={setFormProductImageFile} />
            <AttachField label="Imagem da validade do produto" marginLeft="10px" files={formProductExpirationDateImageFile} setFiles={setFormProductExpirationDateImageFile} />
          </InputGroup>

          <style.ActionsContainer>
            <style.CancelButton type='button' onClick={handleClosePopup}>Cancelar</style.CancelButton>
            <Button type="submit" style={{ width: "auto" }}>Salvar produto</Button>
          </style.ActionsContainer>

        </style.Form>
      </style.Container>
    </style.TransparentBackground>
  )
}

export default CreateNewProductPopup