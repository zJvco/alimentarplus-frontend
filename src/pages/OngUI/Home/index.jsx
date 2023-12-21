import React from 'react'
import style from './styles'

function Home() {
  return (
    <style.OverviewContainer>
      <style.OverviewTitle>Visão Geral</style.OverviewTitle>
      <style.OverviewSubtitle>Aqui você pode encontrar informações gerais da sua ONG.</style.OverviewSubtitle>
      <style.OverviewContenContainer>
        <style.OverviewDataBox>
          <style.OverviewDataBoxTitle>Qtd. Total de Alimentos</style.OverviewDataBoxTitle>
          <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
        </style.OverviewDataBox>

        <style.OverviewDataBox>
          <style.OverviewDataBoxTitle>Qtd. de Doações Ativas</style.OverviewDataBoxTitle>
          <style.OverviewDataBoxContent>0</style.OverviewDataBoxContent>
        </style.OverviewDataBox>
      </style.OverviewContenContainer>
    </style.OverviewContainer>
  )
}

export default Home