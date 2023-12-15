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
import { useRef } from 'react'
import { productValidations } from '../../utils/validations'
import CircularLoader from '../../components/CircularLoader'
import { formatDecimalNumber } from '../../utils/helpers'

function CreateNewProductPopup({
  isOpen,
  setIsOpen
}) {
  const totalWeightGramsInputRef = useRef()

  const queryClient = useQueryClient()

  const { user, token } = useAuth()

  const [formData, setFormData] = useState({
    "name": "",
    "brand": "",
    "description": "",
    "unit_weight_grams": "",
    "total_weight_grams": "",
    "quantity_units": "",
    "expiration_date": "",
    "url_product_img": "",
    "url_expiration_date_img": "",
  })
  const [formProductImageFile, setFormProductImageFile] = useState([])
  const [formProductExpirationDateImageFile, setFormProductExpirationDateImageFile] = useState([])
  const [inputErrors, setInputErrors] = useState({})

  const handleClosePopup = () => {
    setIsOpen(!isOpen)
  }

  const uploadFiles = async (files) => {
    const fd = new FormData()

    for (const file of files) {
      fd.append("files", file)
    }

    const response = await api.post("/upload/", fd, {
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

  const uploadProductImageMutation = useMutation(uploadFiles, {
    onError: () => {
      notify("Erro ao cadastrar a imagem do produto no servidor", "error")
    }
  })
  const uploadProductExpirationDateImageMutation = useMutation(uploadFiles, {
    onError: () => {
      notify("Erro ao cadastrar a imagem de validade do produto no servidor", "error")
    }
  })
  const createProductMutation = useMutation(createProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products")

      notify("Produto cadastrado com sucesso", "success")

      setIsOpen(!isOpen)
    },
    onError: () => {
      notify("Erro ao cadastrar o produto", "error")
    }
  })

  const handleInputChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }

    if (e.target.name === "unit_weight_grams" || e.target.name === "quantity_units") {
      const totalWeightCalc = newObj.unit_weight_grams * newObj.quantity_units
      // const totalWeightCalcFormatted = formatDecimalNumber(totalWeightCalc, 2)

      totalWeightGramsInputRef.current.value = totalWeightCalc

      setFormData({ ...newObj, "total_weight_grams": totalWeightCalc })
    }
    else {
      setFormData(newObj)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newObjData = {
      ...formData
    }

    let uploadedProductImage
    let uploadedProductExpirationDateImage

    if (formProductImageFile.length !== 0 && formProductExpirationDateImageFile.length !== 0) {
      uploadedProductImage = await uploadProductImageMutation.mutateAsync(formProductImageFile)
      uploadedProductExpirationDateImage = await uploadProductExpirationDateImageMutation.mutateAsync(formProductExpirationDateImageFile)

      newObjData.url_product_img = uploadedProductImage[0].file_url
      newObjData.url_expiration_date_img = uploadedProductExpirationDateImage[0].file_url
    }

    const validations = productValidations(newObjData)
    const isReadyToSend = (Object.keys(validations).length === 0) && (uploadedProductImage.length !== 0) && (uploadedProductExpirationDateImage.length !== 0)

    if (isReadyToSend) {
      createProductMutation.mutate(newObjData)

      setFormData(newObjData)
    }

    setInputErrors(validations)
  }

  return (
    <style.TransparentBackground>
      <style.Container>
        {createProductMutation.isLoading ? (
          <CircularLoader />
        ) : (
          <>
            <style.Header>
              <style.Title>Cadastrar novo produto</style.Title>
            </style.Header>

            <style.Form onSubmit={handleSubmit}>

              <InputGroup>
                <InputField
                  label="Nome"
                  name="name"
                  placeholder="Insira o nome do seu produto"
                  onChange={handleInputChange}
                  error={inputErrors.name && inputErrors.name}
                />
                <InputField
                  label="Marca"
                  name="brand"
                  marginLeft="10px"
                  placeholder="Insira a marca do seu produto"
                  onChange={handleInputChange}
                  error={inputErrors.brand && inputErrors.brand}
                />
              </InputGroup>

              <InputGroup>
                <InputField
                  label="Peso por unidade (g)"
                  name="unit_weight_grams"
                  placeholder="Insira o peso por unidade"
                  onChange={handleInputChange}
                  error={inputErrors.unit_weight_grams && inputErrors.unit_weight_grams}
                />
                <InputField
                  label="Quantidade de unidades"
                  name="quantity_units"
                  type="number"
                  marginLeft="10px"
                  placeholder="Insira a quantidade de produtos/embalagens"
                  onChange={handleInputChange}
                  error={inputErrors.quantity_units && inputErrors.quantity_units}
                />
              </InputGroup>

              <InputGroup>
                <InputField
                  label="Peso total (g)"
                  name="total_weight_grams"
                  disable
                  placeholder="Peso total"
                  ref={totalWeightGramsInputRef}
                  error={inputErrors.total_weight_grams && inputErrors.total_weight_grams}
                />
                <InputField
                  label="Data de validade"
                  name="expiration_date"
                  type="date"
                  marginLeft="10px"
                  onChange={handleInputChange}
                  error={inputErrors.expiration_date && inputErrors.expiration_date}
                />
              </InputGroup>

              <TextField
                label="Descrição"
                name="description"
                placeholder="Insira uma descrição para o seu produto"
                rows="10"
                onChange={handleInputChange}
                error={inputErrors.description && inputErrors.description}
              />

              <InputGroup>
                <AttachField label="Imagem do produto" files={formProductImageFile} setFiles={setFormProductImageFile} error={inputErrors.url_product_img && inputErrors.url_product_img} />
                <AttachField label="Imagem da validade do produto" marginLeft="10px" files={formProductExpirationDateImageFile} setFiles={setFormProductExpirationDateImageFile} error={inputErrors.url_expiration_date_img && inputErrors.url_expiration_date_img} />
              </InputGroup>

              <style.ActionsContainer>
                <style.CancelButton type='button' onClick={handleClosePopup}>Cancelar</style.CancelButton>
                <Button type="submit" style={{ width: "auto" }}>Salvar produto</Button>
              </style.ActionsContainer>

            </style.Form>
          </>
        )}
      </style.Container>
    </style.TransparentBackground>
  )
}

export default CreateNewProductPopup