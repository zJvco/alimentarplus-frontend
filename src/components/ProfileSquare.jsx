import React from 'react'
import styled from 'styled-components'
import ProfileDropdown from './ProfileDropdown'
import { useState, useRef } from 'react'
import { useEffect } from 'react'

function ProfileSquare() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isDropdownOpen])

  return (
    <SquareContainer
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <NameInitials>JV</NameInitials>
      
      { isDropdownOpen && (
        <ProfileDropdown ref={dropdownRef}/>
      )}
    </SquareContainer>
  )
}

const SquareContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  padding: 5px;
  background-color: ${props => props.theme.colors.borderColor};
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
`

const NameInitials = styled.span`
  color: #FFFFFF;
  font-weight: bold;
  letter-spacing: 2px;
  padding-left: 2px;
`

export default ProfileSquare