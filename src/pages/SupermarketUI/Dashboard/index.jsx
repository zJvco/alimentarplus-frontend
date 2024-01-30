import React from 'react'
import styled from 'styled-components'
import { FaClipboardCheck, FaBoxOpen, FaBolt, FaScaleBalanced } from 'react-icons/fa6'
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, CartesianGrid } from 'recharts'


const Title = styled.h1`

`

const MetricsContainer = styled.div`
  display: flex;
  margin: 20px 0;
`

const MetricCard = styled.div`
  padding: 20px;
  background-color: #FFFFFF;
  margin-right: 10px;
  border: 1px solid #F5F5F5;
  width: 100%;
  color: #ACACAC;
  border-radius: 5px;
`

const MetricTitle = styled.p`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    position: absolute;
    right: 0;
    margin-left: 10px;
    padding: 12px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    font-size: 18px;
    color: #FFFFFF;
  }
`

const MetricValue = styled.p`
  font-size: 30px;
`

const DailyDonationsDashboardContainer = styled.div`
  border: 1px solid #F5F5F5;
  border-radius: 5px;
  padding: 20px;
`

const DailyDonationsTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`

const DailyDonationsSubtitle = styled.p`
  color: #ACACAC;
`

const data = [
  {
    day: 1,
    qd: 1000
  },
  {
    day: 2,
    qd: 300,
  },
  {
    day: 3,
    qd: 700,
  },
  {
    day: 4,
    qd: 1300,
  },
  {
    day: 5,
    qd: 500,
  },
  {
    day: 6,
    qd: 20,
  }
]


function Dashboard() {
  return (
    <>
      <Title>Dashboard</Title>

      <MetricsContainer>
        <MetricCard style={{ borderLeft: "4px solid #0097B2" }}>
          <MetricTitle>
            Doações Totais
            <div style={{ backgroundColor: "#0097B2" }} >
              <FaClipboardCheck/>
            </div>
          </MetricTitle>
          <MetricValue>1.234</MetricValue>
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #FFDE59" }}>
          <MetricTitle>
            Qtd. Peso Doados/Mês
            <div style={{ backgroundColor: "#FFDE59" }} >
              <FaScaleBalanced/>
            </div>
          </MetricTitle>
          <MetricValue>1.942kg</MetricValue>
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #A259FF" }}>
          <MetricTitle>
            Total Produtos Cadastrados
            <div style={{ backgroundColor: "#A259FF" }} >
              <FaBoxOpen/>
            </div>
          </MetricTitle>
          <MetricValue>224</MetricValue>
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #58D68D", marginRight: "0" }}>
          <MetricTitle>
            Produtos Ativos/Inativos
            <div style={{ backgroundColor: "#58D68D" }} >
              <FaBolt/>
            </div>
          </MetricTitle>
          <MetricValue>200/24</MetricValue>
        </MetricCard>
      </MetricsContainer>

      <DailyDonationsDashboardContainer>
        <DailyDonationsTitle>Doações diárias</DailyDonationsTitle>
        <DailyDonationsSubtitle>Nos últimos 30 dias</DailyDonationsSubtitle>

        <ResponsiveContainer width={"100%"} height={400} style={{ margin: "25px 0" }}>
          <BarChart
            data={data}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qd" fill='#0097B2' />
          </BarChart>
        </ResponsiveContainer>
      </DailyDonationsDashboardContainer>

    </>
  )
}


export default Dashboard