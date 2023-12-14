import React from 'react'
import style from './styles'
import InputField from '../../../components/Form/InputField'
import InputGroup from '../../../components/Form/InputGroup'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../../api/config'
import useAuth from '../../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import CircularLoader from '../../../components/CircularLoader'
import SwitchField from '../../../components/Form/SwitchField'
import { useState } from 'react'
import TextField from '../../../components/Form/TextField'
import Button from '../../../components/Form/Button'
import AttachField from '../../../components/Form/AttachField'
import { useEffect } from 'react'
import { notify } from '../../../utils/notify'
import { productValidations } from '../../../utils/validations'
import ConfirmationPopup from '../../../components/ConfirmationPopup'

function ProductView() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { id: productId } = useParams()

  const [isSwitchActive, setIsSwitchActive] = useState(false)
  const [updatedFormData, setUpdatedFormData] = useState({
    "name": "",
    "brand": "",
    "description": "",
    "unit_weight_grams": "",
    "total_weight_grams": "",
    "quantity_units": null,
    "is_active": null,
    "expiration_date": "",
    "url_product_img": "",
    "url_expiration_date_img": ""
  })
  const [isOpenDeleteConfirmationPopup, setIsOpenDeleteConfirmationPopup] = useState(false)

  const { user, token } = useAuth()

  const getProduct = async (id) => {
    const response = await api.get(`/supermarkets/${user.id_supermarket}/products/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return response.data
  }

  const deleteProduct = async (id) => {
    const response = await api.delete(`/supermarkets/${user.id_supermarket}/products/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return response.data
  }

  const updateProduct = async (id, data) => {
    const response = await api.put(`/supermarkets/${user.id_supermarket}/products/${id}`, JSON.stringify(data), {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    return response.data
  }

  const { data: productData, isLoading } = useQuery(["products", productId], {
    queryFn: () => getProduct(productId),
    onSuccess: (data) => {
      for (let key in updatedFormData) {
        setUpdatedFormData((prev) => ({ ...prev, [key]: data[key] }))
      }
      setIsSwitchActive(data.is_active)
    },
    refetchOnWindowFocus: false
  })

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("products")

      notify("Produto deletado com sucesso", "success")
    }
  })

  const updateProductMutation = useMutation({
    mutationFn: () => {
      updateProduct(productId, updatedFormData)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products", productId])

      notify("Produto alterado com sucesso", "success")
    }
  })

  const handleDeleteProduct = () => {
    deleteProductMutation.mutate(productId)

    navigate("/estabelecimento/produtos")
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()

    updateProductMutation.mutate()
  }

  const handleSwitchClick = () => {
    setIsSwitchActive(!isSwitchActive)
  }

  const handleInputChange = (key, event) => {
    const { value } = event.target

    setUpdatedFormData({ ...updatedFormData, [key]: value })
  }

  useEffect(() => {
    setUpdatedFormData({ ...updatedFormData, "is_active": isSwitchActive })
  }, [isSwitchActive])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <style.Container>
      <style.TitleProductName>{productData?.name}</style.TitleProductName>
      <style.SubtitleProductID>#{productData?.id}</style.SubtitleProductID>

      <style.Form onSubmit={handleUpdateProduct}>
        <InputGroup>
          <InputField label="ID" value={productData?.id} disable={true} />
          <InputField label="Nome" marginLeft="10px" value={productData?.name} onChange={(e) => handleInputChange("name", e)} />
          <InputField label="Marca" marginLeft="10px" value={productData?.brand} onChange={(e) => handleInputChange("brand", e)} />
        </InputGroup>

        <InputGroup>
          <InputField label="Peso por unidade (g)" type="number" value={productData?.unit_weight_grams} onChange={(e) => handleInputChange("unit_weight_grams", e)} />
          <InputField label="Quantidade de unidades" marginLeft="10px" value={productData?.quantity_units} onChange={(e) => handleInputChange("quantity_units", e)} />
          <InputField label="Data de validade" marginLeft="10px" type="date" value={productData?.expiration_date} onChange={(e) => handleInputChange("expiration_date", e)} />
        </InputGroup>

        <InputGroup>
          <InputField label="Peso total (g)" value={productData?.total_weight_grams} onChange={(e) => handleInputChange("total_weight_grams", e)} />
          <SwitchField label="Ativo" marginLeft="10px" onClick={handleSwitchClick} isActive={isSwitchActive} />
        </InputGroup>

        <TextField label="Descrição" value={productData?.description} rows="10" onChange={(e) => handleInputChange("description", e)} />

        {/* <InputGroup>
          <AttachField label="Imagem do produto" />
          <AttachField label="Imagem da validade do produto" marginLeft="10px" />
        </InputGroup> */}

        <style.ActionsContainer>
          <style.CancelButton type='button' onClick={() => navigate("/estabelecimento/produtos")}>Cancelar</style.CancelButton>
          <Button type="button" className="danger" margin="0 15px 0 0" onClick={() => setIsOpenDeleteConfirmationPopup(true)}>Excluir produto</Button>
          <Button type="submit">Salvar produto</Button>
        </style.ActionsContainer>
      </style.Form>

      {isOpenDeleteConfirmationPopup && (
        <ConfirmationPopup
          title="Deseja realmente deletar esse produto?"
          setClose={setIsOpenDeleteConfirmationPopup}
          close={isOpenDeleteConfirmationPopup}
          actionFn={handleDeleteProduct}
        />
      )}
    </style.Container>
  )
}

export default ProductView