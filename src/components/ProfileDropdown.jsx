import React, { forwardRef } from 'react'
import styled from 'styled-components'
import Divisor from './Divisor'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const ProfileDropdown = forwardRef(function ProfileDropdown(props, ref) {
    const navigate = useNavigate()

    const { logout, userType } = useAuth()

    const handleLogout = () => {
        logout()

        navigate("/login")
    }

    return (
        <Container ref={ref}>
            <TopArrow />

            <LinkList>
                <LinkContent>
                    <Link href='/estabelecimento/perfil'>Minha Conta</Link>
                </LinkContent>

                {userType === "supermarket" && (
                    <LinkContent>
                        <Link href='/estabelecimento/planos'>Planos</Link>
                    </LinkContent>
                )}

                <LinkContent>
                    <Link href='/estabelecimento/suporte'>Suporte</Link>
                </LinkContent>
            </LinkList>

            <Link className='logout' onClick={handleLogout}>Sair</Link>
        </Container>
    )
})

const Container = styled.div`
    position: absolute;
    top: 45px;
    right: 0;
    width: 140px;
    height: 200px;
    box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px; 
    cursor: default;
    border: 1px solid #CCCCCC;
    text-align: left;
    background-color: #FFFFFF;
    z-index: 1000;
`

const LinkList = styled.ul`
    list-style-type: none;
`

const LinkContent = styled.li`
    display: flex;
`

const Link = styled.a`
    width: 100%;
    padding: 4px 10px;
    color: ${props => props.theme.colors.black};
    cursor: pointer;
    
    &:hover {
        text-decoration: none;
    }
`

const TopArrow = styled.div`
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: #FFFFFF;
    position: absolute;
    right: 10px;
    top: -6px;
    border-left: 2px solid ${props => props.theme.colors.borderColor};
    border-top: 2px solid ${props => props.theme.colors.borderColor};
`

export default ProfileDropdown