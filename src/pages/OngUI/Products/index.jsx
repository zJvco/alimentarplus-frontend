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
    const navigate = useNavigate()

    const { token } = useAuth()

    const getAllProducts = async () => {
        const response = await api.get("/products", {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getAllProductsQuery = useQuery("products", {
        queryFn: () => getAllProducts()
    })

    const handleVisualizeProductButton = (productId) => {
        navigate(`/ong/produtos/${productId}`)
    }

    if (getAllProductsQuery.isLoading) {
        return <CircularLoader />
    }

    return (
        <style.Container>
            <style.Title>Produtos disponíveis</style.Title>

            <style.ProductsList>
                {getAllProductsQuery.data.map(product => {
                    if (!product.is_active) return
                    
                    return (
                        <style.ProductCard key={product.id}>
                            <style.ProductImage src={product.url_product_img} alt='Imagem do produto' />

                            <style.ProductContentContainer>
                                <style.ProductContent>
                                    <b><style.ProductNameText>{product.name}</style.ProductNameText></b>
                                    <style.ProductOwnerText>Supermercado - {product.id_supermarket}</style.ProductOwnerText>
                                    <style.ProductUnitsAvailableText>{product.quantity_units} unidades</style.ProductUnitsAvailableText>
                                </style.ProductContent>
                                <style.ProductContentFooter>
                                    <Button margin="0" onClick={() => handleVisualizeProductButton(product.id)}>
                                        Ver produto&nbsp;&nbsp;
                                        <FaEye />
                                    </Button>
                                </style.ProductContentFooter>
                            </style.ProductContentContainer>
                        </style.ProductCard>
                    )
                })}

            </style.ProductsList>
        </style.Container>
    )
}



export default Products