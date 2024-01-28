import React, { useEffect, useRef } from 'react'
import style from './styles'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import api from '../../../api/config'
import useAuth from '../../../hooks/useAuth'
import CircularLoader from '../../../components/CircularLoader'
import Button from '../../../components/Form/Button'
import { useState } from 'react'
import { notify } from '../../../utils/notify'
import { convertDateType } from '../../../utils/helpers'
import { FaUpRightFromSquare } from 'react-icons/fa6'

function ProductView() {
    const { id: productId } = useParams()
    const navigate = useNavigate()

    const { user, token } = useAuth()

    const [isOpenedPopup, setIsOpenedPopup] = useState(false)
    
    const getProductById = async (id) => {
        const response = await api.get(`/products/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getSupermarketById = async (id) => {
        const response = await api.get(`/supermarkets/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getProductByIdQuery = useQuery(["products", productId], {
        queryFn: () => getProductById(productId)
    })

    const getSupermarketByIdQuery = useQuery(["supermarkets", getProductByIdQuery?.data?.id_supermarket], {
        queryFn: () => getSupermarketById(getProductByIdQuery.data.id_supermarket),
        enabled: !getProductByIdQuery.isLoading && !!getProductByIdQuery.data
    })

    const createDonation = async (data) => {
        const response = await api.post("/donations", JSON.stringify(data), {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const createDonationMutation = useMutation({
        mutationFn: () => {
            const data = {
                "situation": "Em andamento",
                "id_supermarket": getSupermarketByIdQuery.data.id,
                "id_ong": user.id_ong,
                "id_product": getProductByIdQuery.data.id
            }

            return createDonation(data)
        },
        onSuccess: (data) => {
            notify("Processo de doação criado com sucesso!", "success")
            
            navigate("/ong/doacoes")
        }
    })

    const handleContinueButton = () => {
        setIsOpenedPopup(!isOpenedPopup)
    }
 
    const handleDonationAgreed = () => {
        createDonationMutation.mutate()
    }

    const handleDonationDoNotAgreed = () => {
        setIsOpenedPopup(!isOpenedPopup)
    }

    if (getProductByIdQuery.isLoading || getSupermarketByIdQuery.isLoading) {
        if (!getProductByIdQuery?.data?.is_active) {
            navigate(-1)
        }

        return <CircularLoader />
    }

    let formattedAddressOutput;

    if (!getSupermarketByIdQuery.isLoading) {
        formattedAddressOutput = `${getSupermarketByIdQuery?.data?.address?.street} ${getSupermarketByIdQuery?.data?.address?.number}, ${getSupermarketByIdQuery?.data?.address?.city}, ${getSupermarketByIdQuery?.data?.address?.state} ${getSupermarketByIdQuery?.data?.address?.zip_code}`
    }

    return (
        <>
            <style.Container>
                <style.HeaderInfoSection>
                    <Link to="/">{getSupermarketByIdQuery?.data?.business_name}</Link>
                    <style.ProductNameText>{getProductByIdQuery?.data?.name}</style.ProductNameText>
                    <style.ProductIdText>#{getProductByIdQuery?.data?.id}</style.ProductIdText>
                </style.HeaderInfoSection>

                <style.ProductInfoSection>
                    <style.SectionTitle>Informações do Produto</style.SectionTitle>

                    <style.ProductInfoContainer>
                        <style.ProductImage src={getProductByIdQuery?.data?.url_product_img} alt='Imagem do produto' />

                        <style.ProductSideInfoContainer>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Nome</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.name}</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Marca</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.brand}</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Data de validade</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{convertDateType(getProductByIdQuery?.data?.expiration_date)}</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Peso unidade</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.unit_weight_grams}/gramas</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Peso total</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.total_weight_grams}/gramas</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                            <style.ProductInfoContentBox>
                                <style.ProductInfoContentBoxTitle>Quantidade de unidades</style.ProductInfoContentBoxTitle>
                                <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.quantity_units}</style.ProductInfoContentBoxValue>
                            </style.ProductInfoContentBox>
                        </style.ProductSideInfoContainer>
                    </style.ProductInfoContainer>

                    {/* Descrição */}
                    <style.ProductInfoContentBoxValue>{getProductByIdQuery?.data?.description}</style.ProductInfoContentBoxValue>
                </style.ProductInfoSection>

                <style.ProductLocalizationSection>
                    <style.SectionTitle>Localização</style.SectionTitle>

                    <style.ProductLocalizationContentContainer>
                        <style.AddressInfoText>
                            {formattedAddressOutput}
                        </style.AddressInfoText>
                        <style.LocalizationLinkHowToGetThere>Como chegar <FaUpRightFromSquare style={{ marginLeft: "5px" }}/></style.LocalizationLinkHowToGetThere>
                    </style.ProductLocalizationContentContainer>

                    <style.LocalizationMapLink href={`https://www.bing.com/maps?where=${formattedAddressOutput}`} target='_blank'>
                        <style.LocalizationMapImage
                            src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/CanvasLight/${formattedAddressOutput}?key=ArbjGjQ0DPeLGgBLKfX-7xF3JiSvvR7B5qgM5_d3tdj8l7bgd0r0Vfbp6dZNehNN&mapSize=1920,350`}
                            alt={`Mapa de ${formattedAddressOutput}`}
                        />
                    </style.LocalizationMapLink>
                </style.ProductLocalizationSection>

                <Button type="button" onClick={handleContinueButton}>Continuar</Button>
            </style.Container>

            { isOpenedPopup && (
                <style.PopupBackground>
                    <style.PopupContainer>
                        <style.PopupTitle>Tem certeza que deseja prosseguir? </style.PopupTitle>
                        <style.PopupText>A partir do momento em que a sua organização fica responsável pelo produto, é obrigação da ONG fazer a coleta e distribuição desses alimentos.</style.PopupText>
                        <style.PopupActions>
                            <Button className="danger" margin="0" onClick={handleDonationDoNotAgreed}>NÃO</Button>
                            <Button margin="0 0 0 15px" onClick={handleDonationAgreed}>SIM</Button>
                        </style.PopupActions>
                    </style.PopupContainer>
                </style.PopupBackground>
            ) }
        </>
    )
}

export default ProductView