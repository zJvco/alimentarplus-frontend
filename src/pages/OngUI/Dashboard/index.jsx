import React, { useState } from 'react'
import styled from 'styled-components'
import { FaClipboardCheck, FaBoxOpen, FaBolt, FaScaleBalanced } from 'react-icons/fa6'
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from 'recharts'
import { useQuery } from 'react-query'
import CircularLoader from '../../../components/CircularLoader.jsx'
import useAuth from '../../../hooks/useAuth'
import CustomToolTip from '../../../components/Charts/CustomToolTip.jsx'
import { getAllOngDonations } from '../../../api/functions.js'

function Dashboard() {
  const { user, token } = useAuth()

  const [totalDonations, setTotalDonations] = useState(0)
  const [totalGroupedDonationsByStatus, setTotalGroupedDonationsByStatus] = useState([])

  const getDonationsQuery = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const result = await getAllOngDonations(user.id_ong, token)

      setTotalDonations(result.length)
      setTotalGroupedDonationsByStatus(result.reduce((acc, cur) => {
        const status = cur.situation
        const existingStatus = acc.find(item => item.status === status)

        if (existingStatus) {
          existingStatus.total++
        }
        else {
          acc.push({ status: status, total: 1 })
        }

        return acc
      }, []))

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
      </MetricsContainer>

      <DonationsByStatusContainer>
        <DonationsByStatusTitle>Doações por status</DonationsByStatusTitle>
        <DonationsByStatusSubtitle>A coletar / Em andamento / Concluído</DonationsByStatusSubtitle>
        
        { getDonationsQuery.isLoading ? (
          <CircularLoader />
        ) : (
          <ResponsiveContainer width={"100%"} height={400} style={{ margin: "25px 0" }}> 
            <PieChart>
              <Tooltip content={<CustomToolTip />} />
              <Legend />
              <Pie
                data={totalGroupedDonationsByStatus}
                dataKey="total"
                fill="#000000"
                nameKey="status"
              >
                {totalGroupedDonationsByStatus.map((item, index) => {
                  if (item.status.toLowerCase() === "em andamento") {
                    return <Cell key={`cell-${index}`} fill={"#0097B2"} />
                  }
                  else if (item.status.toLowerCase() === "a coletar") {
                    return <Cell key={`cell-${index}`} fill={"#FFDE59"} />
                  }
                  else if (item.status.toLowerCase() === "concluido") {
                    return <Cell key={`cell-${index}`} fill={"#58D68D"} />
                  }
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}

      </DonationsByStatusContainer>
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

const DonationsByStatusContainer = styled.div`
  border: 1px solid #F5F5F5;
  border-radius: 5px;
  padding: 20px;
`

const DonationsByStatusTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`

const DonationsByStatusSubtitle = styled.p`
  color: #ACACAC;
`

export default Dashboard