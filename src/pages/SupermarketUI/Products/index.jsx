import React, { useState } from 'react'
import style from './styles'
import { useQuery } from 'react-query'
import api from '../../../api/config'
import useAuth from '../../../hooks/useAuth'
import { DataGrid, ptBR } from '@mui/x-data-grid';
import CircularLoader from '../../../components/CircularLoader'
import MUICustomToolBar from '../../../components/Mui/CustomToolBar'
import { muiCustomDataTableStyle } from '../../../components/Mui/customStyles'
import CreateNewProductPopup from '../../../components/CreateNewProductPopup'
import { useNavigate } from 'react-router-dom'
import { convertDateType } from '../../../utils/helpers'

const muiTableColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Nome", flex: 1 },
  { field: "brand", headerName: "Marca", flex: 1 },
  { field: "quantity_units", headerName: "Quantidade Unidade", flex: 1 },
  {
    field: "is_active",
    headerName: "Ativo",
    flex: 1,
    valueFormatter: (params) => params.value == "true" ? "Sim" : "Não"
  },
  {
    field: "expiration_date",
    headerName: "Data de Validade",
    flex: 1,
    valueFormatter: (params) => convertDateType(params.value)
  }
]

function Products() {
  const navigate = useNavigate()
  
  const [isOpenCreateNewProdutoPopup, setIsOpenCreateNewProdutoPopup] = useState(false)
  
  const { user, token } = useAuth()

  const getProducts = async () => {
    const response = await api.get(`/supermarkets/${user.id_supermarket}/products`, {
      headers: {
        "Authorization": "Bearer " + token 
      }
    })

    return response.data
  }

  const { isLoading, data: productsData } = useQuery("products", {
    queryFn: () => getProducts()
  })

  return (
    <style.Container>
      { isOpenCreateNewProdutoPopup && (
        <CreateNewProductPopup
          isOpen={isOpenCreateNewProdutoPopup}
          setIsOpen={setIsOpenCreateNewProdutoPopup}
        />
      ) }
      <h1>Produtos</h1>
      <DataGrid
        rows={productsData ? productsData : []}
        columns={muiTableColumns}
        checkboxSelection
        sx={muiCustomDataTableStyle}
        loading={isLoading}
        slots={{
          toolbar: MUICustomToolBar,
          loadingOverlay: CircularLoader
        }}
        slotProps={{
          toolbar: { isOpenCreateNewProdutoPopup: isOpenCreateNewProdutoPopup, setIsOpenCreateNewProdutoPopup: setIsOpenCreateNewProdutoPopup, hasAddNewProductButton: true  }
        }}
        onRowDoubleClick={(rowData) => navigate("/estabelecimento/produtos/" + rowData.id)}
        disableRowSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        autoHeight
      />
    </style.Container>
  )
}

export default Products