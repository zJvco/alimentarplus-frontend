import React from 'react'
import style from './styles'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from 'react-query'
import api from '../../../api/config'
import CircularLoader from '../../../components/CircularLoader'
import Button from '../../../components/Form/Button'
import { FaEye } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function Products() {
    const { token } = useAuth()

    const getAllSupermarkets = async () => {
        const response = await api.get("/supermarkets", {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getAllSupermarketsQuery = useQuery("supermarkets", {
        queryFn: () => getAllSupermarkets()
    })

    return (
        <style.Container>
            <style.Title>Alimentos disponíveis</style.Title>

            { getAllSupermarketsQuery.isLoading ? (
                <CircularLoader />
            ) : (
                <style.AllSupermarketsContainer>
                    { getAllSupermarketsQuery?.data?.map(supermarket => {
                        return (
                            <style.InfosContainer key={supermarket.id}>
                                <style.SupermarketLink href={"/ong/estabelecimentos/" + supermarket.name}>
                                    <style.SupermarketImageContainer>
                                        <style.SupermarketImage />
                                    </style.SupermarketImageContainer>
                                    <style.SupermarketName>{supermarket.name}</style.SupermarketName>
                                </style.SupermarketLink>

                                <style.ProductsContainer>
                                    <style.ProductsList>
                                        { supermarket?.products?.map((product, index) => {
                                            if (index >= 5 && product.is_active === false) {
                                                return
                                            }

                                            if (product.is_active === false) {
                                                return
                                            }

                                            return (
                                                <style.ProductRow key={index}>
                                                    <style.ProductLink href={"/ong/estabelecimentos/" + supermarket.name + "/produtos/" + product.id}>
                                                        <style.ProductImage src={ product.url_product_img } />
                                                        <style.ProductInformations>
                                                            <style.ProductName>{ product.name }</style.ProductName>
                                                            <style.ProductQuantity>{ product.quantity_units } unidades</style.ProductQuantity>
                                                        </style.ProductInformations>
                                                    </style.ProductLink>
                                                </style.ProductRow>
                                            )
                                        }) }
                                    </style.ProductsList>
                                </style.ProductsContainer>
                            </style.InfosContainer>
                        )
                    }) }
                </style.AllSupermarketsContainer>
            ) }
        </style.Container>
    )
}

export default Products