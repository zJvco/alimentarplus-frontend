import React, { useState } from 'react'
import style from './styles'
import { useQuery, useQueries } from 'react-query'
import api from '../../../api/config'
import { muiCustomDataTableStyle } from '../../../components/Mui/customStyles'
import MUICustomToolBar from '../../../components/Mui/CustomToolBar'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import useAuth from '../../../hooks/useAuth'
import CircularLoader from '../../../components/CircularLoader'
import { convertDatetimeType } from '../../../utils/helpers'

const muiTableColumns = [
    { field: "id", headerName: "ID da Doação", flex: 1 },
    { field: "id_product", headerName: "ID do Produto", flex: 1 },
    // { field: "ong_name", headerName: "Nome da ONG", flex: 1 },
    { field: "id_ong", headerName: "ID da ONG", flex: 1 },
    { field: "situation", headerName: "Situação", flex: 1 },
    { field: "created_date", headerName: "Data da Operação", flex: 1 },
]

function Donations() {
    const { user, token } = useAuth()

    const getAllDonations = async () => {
        const response = await api.get(`supermarkets/${user.id_supermarket}/donations`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        return response.data
    }

    const getDonationsQuery = useQuery("donations", {
        queryFn: () => getAllDonations(),
        retry: false
    })

    return (
        <style.Container>
            <h1>Doações</h1>
            <DataGrid
                rows={getDonationsQuery.data || []}
                columns={muiTableColumns}
                checkboxSelection
                sx={muiCustomDataTableStyle}
                slots={{
                    toolbar: MUICustomToolBar,
                    loadingOverlay: CircularLoader
                }}
                loading={getDonationsQuery.isLoading}
                slotProps={{
                    toolbar: { hasAddNewProductButton: false }
                }}
                disableRowSelectionOnClick
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                autoHeight
            />
        </style.Container>
    )
}

export default Donations