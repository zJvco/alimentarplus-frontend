import React from 'react'
import style from './styles'
import { useQuery, useQueries } from 'react-query'
import { muiCustomDataTableStyle } from '../../../components/Mui/customStyles.jsx'
import MUICustomToolBar from '../../../components/Mui/CustomToolBar.jsx'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import useAuth from '../../../hooks/useAuth'
import CircularLoader from '../../../components/CircularLoader.jsx'
import { getAllOngDonations } from '../../../api/functions.js'

const muiTableColumns = [
    { field: "id", headerName: "ID da Doação", flex: 1 },
    { field: "id_product", headerName: "ID do Produto", flex: 1 },
    // { field: "supermarket_name", headerName: "Nome do Supermercado", flex: 1 },
    { field: "id_supermarket", headerName: "ID do Mercado", flex: 1 },
    { field: "situation", headerName: "Situação", flex: 1 },
    { field: "created_date", headerName: "Data da Operação", flex: 1 },
]

function Donations() {
    const { user, token } = useAuth()

    // const getSupermarketById = async (id) => {
    //     const response = await api.get(`/supermarkets/${id}`, {
    //         headers: {
    //             "Authorization": "Bearer " + token 
    //         }
    //     })

    //     return response.data
    // }

    const getDonationsQuery = useQuery("donations", {
        queryFn: () => getAllOngDonations(user.id_ong, token)
    })

    // const modifiedDonatiosQueries = useQueries(
    //     getDonationsQuery.data?.map(donation => {
    //         return {
    //             queryKey: ['supermarkets', donation.id_supermarket],
    //             queryFn: async () => {
    //                 const result = await getSupermarketById(donation.id_supermarket)

    //                 return { ...donation, "supermarket_name": result.name }
    //             },
    //             // refetchOnWindowFocus: false
    //         }
    //     }) ?? []
    // )

    // const modifiedDonationsIsLoading = modifiedDonatiosQueries.some(result => result.isLoading)

    return (
        <style.Container>
            <h1>Doações</h1>
            <DataGrid
                // rows={!modifiedDonationsIsLoading ? modifiedDonatiosQueries.map(item => item.data) : []}
                rows={getDonationsQuery.data || []}
                columns={muiTableColumns}
                checkboxSelection
                sx={muiCustomDataTableStyle}
                slots={{
                    toolbar: MUICustomToolBar
                }}
                // loading={modifiedDonationsIsLoading}
                loading={getDonationsQuery.isLoading}
                slotProps={{
                    toolbar: { hasAddNewProductButton: false }
                }}
                // onRowDoubleClick={(rowData) => navigate("/estabelecimento/produtos/" + rowData.id)}
                disableRowSelectionOnClick
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                autoHeight
            />
        </style.Container>
    )
}

export default Donations