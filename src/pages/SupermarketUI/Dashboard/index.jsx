import React, { useState } from 'react'
import styled from 'styled-components'
import { FaClipboardCheck, FaBoxOpen, FaBolt, FaScaleBalanced } from 'react-icons/fa6'
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useQuery } from 'react-query'
import CircularLoader from '../../../components/CircularLoader'
import api from '../../../api/config'
import useAuth from '../../../hooks/useAuth'

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
  const { user, token } = useAuth()

  const [productsSum, setProductsSum] = useState(0)
  const [activeProducts, setActiveProducts] = useState(0)
  const [inactiveProducts, setInactiveProducts] = useState(0)
  const [totalDonations, setTotalDonations] = useState(0)

  const getDonationsLast30Days = async () => {
    const response = await api.get(`supermarkets/${user.id_supermarket}/dashboard/donations-last-30-days`, {
      headers: {
          "Authorization": "Bearer " + token
      }
    })

    return response.data
  }

  const getProducts = async () => {
    const response = await api.get(`supermarkets/${user.id_supermarket}/products`, {
      headers: {
          "Authorization": "Bearer " + token
      }
    })

    return response.data
  }

  const getDonations = async () => {
    const response = await api.get(`supermarkets/${user.id_supermarket}/donations`, {
      headers: {
          "Authorization": "Bearer " + token
      }
    })

    return response.data
  }

  const getDonationsLast30DaysQuery = useQuery({
    queryKey: ["donations-last-30-days"],
    queryFn: async () => {
      const result = await getDonationsLast30Days()

      const currentDate = new Date()

      const queueDatesData = []

      for (let i = 0; i < 30; i++) {
        const newQueueDate = new Date()
        let queueDay

        newQueueDate.setDate(currentDate.getDate() - i)

        if (newQueueDate.getDate().toString().length < 2) {
          queueDay = "0" + newQueueDate.getDate().toString()
        }
        else {
          queueDay = newQueueDate.getDate().toString()
        }

        let totalDonations = 0

        for (const item of result) {
          const convertedItemCreatedDateToDate = new Date(item.created_date)
          
          if (
            (newQueueDate.getDate() === convertedItemCreatedDateToDate.getDate()) &&
            (newQueueDate.getMonth() === convertedItemCreatedDateToDate.getMonth()) &&
            (newQueueDate.getFullYear() === convertedItemCreatedDateToDate.getFullYear())
          ) {
            totalDonations += 1
          }
        }

        queueDatesData.push({
          day: queueDay,
          total: totalDonations
        })
      }

      return queueDatesData.reverse()
    }
  })

  const getProductsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await getProducts()

      setProductsSum(result.length)

      let ap = 0, ip = 0;

      for (const product of result) {
        if (product.is_active) {
          ap += 1
        }
        else {
          ip += 1
        }
      }

      setActiveProducts(ap)
      setInactiveProducts(ip)

      return result
    }
  })

  const getDonationsQuery = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const result = await getDonations()

      setTotalDonations(result.length)

      return result
    }
  })

  return (
    <>
      <Title>Dashboard</Title>

      <MetricsContainer>
        <MetricCard style={{ borderLeft: "4px solid #0097B2" }}>
          { getDonationsQuery.isLoading ? (
            <CircularLoader />
          ) : (
            <>
              <MetricTitle>
                Doações Totais
                <span style={{ backgroundColor: "#0097B2" }} >
                  <FaClipboardCheck/>
                </span>
              </MetricTitle>
              <MetricValue>{totalDonations}</MetricValue>
            </>
          )}
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #FFDE59" }}>
          <MetricTitle>
            Qtd. Peso Doados/Mês
            <span style={{ backgroundColor: "#FFDE59" }} >
              <FaScaleBalanced/>
            </span>
          </MetricTitle>
          <MetricValue>1.942kg</MetricValue>
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #A259FF" }}>
          { getProductsQuery.isLoading ? (
            <CircularLoader />
          ) : (
            <>
              <MetricTitle>
                Total Produtos Cadastrados
                <span style={{ backgroundColor: "#A259FF" }} >
                  <FaBoxOpen/>
                </span>
              </MetricTitle>
              <MetricValue>{productsSum}</MetricValue>
            </>
          )}
        </MetricCard>

        <MetricCard style={{ borderLeft: "4px solid #58D68D", marginRight: "0" }}>
          { getProductsQuery.isLoading ? (
            <CircularLoader />
          ) : (
            <>
              <MetricTitle>
                Produtos Ativos/Inativos
                <span style={{ backgroundColor: "#58D68D" }} >
                  <FaBolt/>
                </span>
              </MetricTitle>
              <MetricValue>{activeProducts}/{inactiveProducts}</MetricValue>
            </>
          )}
        </MetricCard>
      </MetricsContainer>

      <DailyDonationsDashboardContainer>
        <DailyDonationsTitle>Doações diárias</DailyDonationsTitle>
        <DailyDonationsSubtitle>Nos últimos 30 dias</DailyDonationsSubtitle>

        { getDonationsLast30DaysQuery.isLoading ? (
          <CircularLoader />
        ) : (
          <ResponsiveContainer width={"100%"} height={400} style={{ margin: "25px 0" }}>
            <BarChart
              data={getDonationsLast30DaysQuery.data}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill='#0097B2' />
            </BarChart>
          </ResponsiveContainer>
        )}

      </DailyDonationsDashboardContainer>

    </>
  )
}

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

  span {
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

export default Dashboard