import React from 'react'
import style from './styles'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from 'react-query'
import api from '../../../api/config'
import CircularLoader from '../../../components/CircularLoader'
import Button from '../../../components/Form/Button'
import { FaCheck } from 'react-icons/fa6'
import { changeFirstLetterToUpperCase } from '../../../utils/helpers'

function Plans() {
    const { user, token } = useAuth()

    const getSupermarketById = async (id) => {
        const response = await api.get(`/supermarkets/${id}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getAllPlans = async () => {
        const response = await api.get(`/plans/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    const getSupermarketByIdQuery = useQuery(["supermarkets", user.id_supermarket], {
        queryFn: () => getSupermarketById(user.id_supermarket)
    })

    const getAllPlansQuery = useQuery("plans", {
        queryFn: () => getAllPlans()
    })

    const handleChangePlanButton = (planName) => {
        if (getSupermarketByIdQuery.data.plan.name === planName) {
            return
        }

        console.log(planName)
    }

    if (getSupermarketByIdQuery.isLoading || getAllPlansQuery.isLoading) {
        return <CircularLoader />
    }

    return (
        <>
            <style.Title>Planos</style.Title>
            <style.Container>
                {getAllPlansQuery?.data.map(plan => {
                    let planName;
                    if (plan.name === "free") {
                        planName = "Grátis"
                    }
                    else if (plan.name === "premium") {
                        planName = "Premium"
                    }

                    if (getSupermarketByIdQuery.data.plan.name !== plan.name) return

                    return (
                        <style.PlanCard key={plan.id}>
                            <style.PlanTopSection>
                                <style.PlanName>{planName}</style.PlanName>
                                <style.PlanBenefitsList>
                                    {plan?.description.split(",").map(item => {
                                        return (
                                            <style.PlanBenefitRow><FaCheck color='green' />&nbsp;&nbsp;{changeFirstLetterToUpperCase(item.trim())}</style.PlanBenefitRow>
                                        )
                                    })}
                                </style.PlanBenefitsList>
                            </style.PlanTopSection>

                            <style.PlanBottomSection>
                                <style.PlanPriceDisplay>R${plan?.price}/mês</style.PlanPriceDisplay>

                                { getSupermarketByIdQuery.data.plan.name === plan.name ? (
                                    <Button margin="0" disabled={true} onClick={() => handleChangePlanButton(plan.name)} >Selecionado</Button>
                                ) : (
                                    <Button margin="0" onClick={() => handleChangePlanButton(plan.name)}>Selecionar</Button>
                                ) }
                                
                            </style.PlanBottomSection>
                        </style.PlanCard>
                    )
                })}
            </style.Container>
        </>
    )
}

export default Plans