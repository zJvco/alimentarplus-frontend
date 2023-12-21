import React, { useEffect } from 'react'
import style from './styles'

function Home() {
    return (
        <style.OverviewContainer>
            <style.OverviewTitle>Visão Geral</style.OverviewTitle>
            <style.OverviewSubtitle>Aqui você pode encontrar informações gerais da sua loja.</style.OverviewSubtitle>
            <style.OverviewContenContainer>
                <style.OverviewDataBox>
                    <style.OverviewDataBoxTitle>Qtd. Produtos Cadastrados</style.OverviewDataBoxTitle>
                    <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
                </style.OverviewDataBox>

                <style.OverviewDataBox>
                    <style.OverviewDataBoxTitle>Qtd. de Doações</style.OverviewDataBoxTitle>
                    <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
                </style.OverviewDataBox>

                <style.OverviewDataBox>
                    <style.OverviewDataBoxTitle>Qtd. de Produtos Ativos</style.OverviewDataBoxTitle>
                    <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
                </style.OverviewDataBox>

                <style.OverviewDataBox>
                    <style.OverviewDataBoxTitle>Qtd. de Produtos Inativos</style.OverviewDataBoxTitle>
                    <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
                </style.OverviewDataBox>
            </style.OverviewContenContainer>
        </style.OverviewContainer>
    )
}

export default Home