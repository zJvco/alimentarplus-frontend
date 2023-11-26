import React, { useState } from 'react'
import style from './styles'
import { useQuery } from 'react-query'
import api from '../../../api/config'
import useAuth from '../../../hooks/useAuth'
import { filterAvailableValuesByList } from '../../../utils/helpers'
import { DataGrid, ptBR } from '@mui/x-data-grid';
import CircularLoader from '../../../components/CircularLoader'
import MUICustomToolBar from '../../../components/Mui/CustomToolBar'
import { muiCustomDataTableStyle } from '../../../components/Mui/customStyles'
import CreateNewProductPopup from '../../../components/CreateNewProductPopup'
import { useNavigate } from 'react-router-dom'

const AVAILABLE_TABLE_VALUES = ["id", "name", "brand", "quantity_units", "is_active", "expiration_date"]

const muiTableColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Nome", flex: 1 },
  { field: "brand", headerName: "Marca", flex: 1 },
  { field: "quantity_units", headerName: "Quantidade Unidade", flex: 1 },
  { field: "is_active", headerName: "Ativo", flex: 1 },
  { field: "expiration_date", headerName: "Data de Validade", flex: 1 }
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
    queryFn: async () => getProducts()
  })

  if (isLoading) {
    return <CircularLoader />
  }

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
        rows={productsData}
        columns={muiTableColumns}
        checkboxSelection
        sx={muiCustomDataTableStyle}
        slots={{
          toolbar: MUICustomToolBar
        }}
        slotProps={{
          toolbar: { isOpenCreateNewProdutoPopup: isOpenCreateNewProdutoPopup, setIsOpenCreateNewProdutoPopup: setIsOpenCreateNewProdutoPopup  }
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