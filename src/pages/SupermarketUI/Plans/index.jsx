import React, { useState } from 'react'
import style from './styles'
import useAuth from '../../../hooks/useAuth'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from '../../../api/config'
import CircularLoader from '../../../components/CircularLoader'
import Button from '../../../components/Form/Button'
import { FaCheck } from 'react-icons/fa6'
import { changeFirstLetterToUpperCase } from '../../../utils/helpers'
import { notify } from '../../../utils/notify'

function Plans() {
    const { user, token } = useAuth()

    const queryClient = useQueryClient()

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

    const updateSupermarketPlan = async (supermarketId, planId) => {
        const data = {
            "id": planId
        }

        const response = await api.post(`/supermarkets/${supermarketId}/update-plan`, JSON.stringify(data), {
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

    const updateSupermarketPlanMutation = useMutation({
        mutationFn: (data) => updateSupermarketPlan(data.supermarket_id, data.plan_id),
        onSuccess: (data) => {
            queryClient.invalidateQueries("plans")
            queryClient.invalidateQueries("supermarkets")

            notify("O seu plano foi alterado", "success")
        }
    })

    const handleChangePlanButton = (planId) => {
        if (getSupermarketByIdQuery.data.plan.name === planId) {
            return
        }

        updateSupermarketPlanMutation.mutate({"supermarket_id": user.id_supermarket, "plan_id": planId})
    }

    if (getSupermarketByIdQuery.isLoading || getAllPlansQuery.isLoading) {
        return <CircularLoader />
    }

    return (
        <>
            <style.Title>Planos</style.Title>
            <style.Container>
                {getAllPlansQuery?.data.map(plan => {
                    return (
                        <style.PlanCard key={plan.id}>
                            <style.PlanTopSection>
                                <style.PlanName>{changeFirstLetterToUpperCase(plan.name)}</style.PlanName>
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
                                    <Button margin="0" disabled={true} onClick={() => handleChangePlanButton(plan.id)} >Selecionado</Button>
                                ) : (
                                    <Button margin="0" onClick={() => handleChangePlanButton(plan.id)}>Selecionar</Button>
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