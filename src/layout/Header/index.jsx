import React from 'react'
import style from './styles'
import useAuth from '../../hooks/useAuth'
import ProfileSquare from '../../components/ProfileSquare'

function Header() {
  const { userType } = useAuth()

  return (
    <style.Header>
      <style.UserTypeDisplay>{ userType === "supermarket" ? "Portal do Supermercado" : "Portal da ONG" }</style.UserTypeDisplay>

      <ProfileSquare />
    </style.Header>
  )
}

export default Header