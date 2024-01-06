import React, { useState } from 'react'
import style from './styles'
import { FaHouse, FaBoxOpen, FaSquarePollVertical, FaClipboardCheck, FaStore, FaChartArea, FaChartColumn, FaBowlFood } from 'react-icons/fa6'
import useAuth from '../../hooks/useAuth'

function Nav() {
  const { userType } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOnMouseEnter = (e) => {
    setIsMenuOpen(true)
  }

  const handleOnMouseLeave = (e) => {
    setIsMenuOpen(false)
  }

  return (
    <style.Container
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className={isMenuOpen ? "open" : ""}
    >
      <style.Logo>A+</style.Logo>
      <style.Links>
        { userType === "supermarket" ? (
          <>
            {/* <style.LinkContainer>
              <style.Link href='/estabelecimento' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaHouse />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Home" className={isMenuOpen ? "show" : ""}>Home</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer> */}

            <style.LinkContainer>
              <style.Link href='/estabelecimento/dashboard' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaChartColumn />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Dashboard" className={isMenuOpen ? "show" : ""}>Dashboard</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>

            <style.LinkContainer>
              <style.Link href='/estabelecimento/produtos' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaBoxOpen />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Produtos" className={isMenuOpen ? "show" : ""}>Produtos</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>

            <style.LinkContainer>
              <style.Link href='/estabelecimento/doacoes' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaClipboardCheck />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Doações" className={isMenuOpen ? "show" : ""}>Doações</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>
          </>
        ) : (
          <>
            {/* <style.LinkContainer>
              <style.Link href='/ong' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaHouse />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Home" className={isMenuOpen ? "show" : ""}>Home</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer> */}

            <style.LinkContainer>
              <style.Link href='/ong/dashboard' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaChartColumn />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Dashboard" className={isMenuOpen ? "show" : ""}>Dashboard</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>

            <style.LinkContainer>
              <style.Link href='/ong/produtos' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaBowlFood />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Alimentos" className={isMenuOpen ? "show" : ""}>Alimentos</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>

            {/* <style.LinkContainer>
              <style.Link href='/estabelecimento/dashboard' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaSquarePollVertical />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Dashboard" className={isMenuOpen ? "show" : ""}>Dashboard</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer> */}

            <style.LinkContainer>
              <style.Link href='/ong/doacoes' style={isMenuOpen ? { justifyContent: "start" } : { justifyContent: "center" }}>
                <FaClipboardCheck />
                <style.LinkTitleHelper className={isMenuOpen ? "show" : ""}>
                  <style.LinkTitle key="Doações" className={isMenuOpen ? "show" : ""}>Doações</style.LinkTitle>
                </style.LinkTitleHelper>
              </style.Link>
            </style.LinkContainer>
          </>
        ) }

      </style.Links>
    </style.Container>
  )
}

export default Nav