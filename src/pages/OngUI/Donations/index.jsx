import React from 'react'
import style from './styles'
import { useQuery } from 'react-query'
import api from '../../../api/config'
import { muiCustomDataTableStyle } from '../../../components/Mui/customStyles'
import MUICustomToolBar from '../../../components/Mui/CustomToolBar'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import useAuth from '../../../hooks/useAuth'
import CircularLoader from '../../../components/CircularLoader'
import { useState } from 'react'
import { useEffect } from 'react'

const muiTableColumns = [
    { field: "id", headerName: "ID da Doação", flex: 1 },
    { field: "id_product", headerName: "ID do Produto", flex: 1 },
    { field: "id_supermarket", headerName: "ID do Supermercado", flex: 1 },
    { field: "situation", headerName: "Situação", flex: 1 },
]

function Donations() {
    const { user, token } = useAuth()

    // const [ongId, setOngId] = useState()

    const getAllDonations = async () => {
        const response = await api.get(`/ongs/${user.id_ong}/donations`, {
            headers: {
                "Authorization": "Bearer " + token 
            }
        })

        return response.data
    }

    // const getOngDataById = async (id) => {
    //     console.log(id)

    //     const response = await api.get(`/ongs/${id}`, {
    //         headers: {
    //             "Authorization": "Bearer " + token 
    //         }
    //     })

    //     return response.data
    // }

    const getDonationsQuery = useQuery("donations", {
        queryFn: () => getAllDonations(),
        onSuccess: (data) => {
            // setOngId(data.id_ong)
        }
    })

    // const getOngByIdQuery = useQuery(["ongs", ongId], {
    //     queryFn: () => {
    //         for (const data of getDonationsQuery.data) {
    //             console.log(data)
    //         }
    //         // getOngDataById(ongId)
    //     },
    //     enabled: !!getDonationsQuery.data
    // })

    if (getDonationsQuery.isLoading) {
        return <CircularLoader />
    }

    return (
        <style.Container>
            <h1>Doações</h1>
            <DataGrid
                rows={getDonationsQuery.data}
                columns={muiTableColumns}
                checkboxSelection
                sx={muiCustomDataTableStyle}
                slots={{
                    toolbar: MUICustomToolBar
                }}
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