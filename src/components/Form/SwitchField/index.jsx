import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

function SwitchField({
    isActive,
    label,
    marginLeft,
    onClick
}) {
    return (
        <Container style={{ marginLeft: marginLeft }}>
            {label && <Label>{label}</Label>}
            <Switch>
                <Input type='checkbox' />
                <Slider onClick={onClick} className={isActive && "active"} />
            </Switch>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Label = styled.label`

`

const Switch = styled.div`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
    margin: 10px 0;
`

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`

const Slider = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background-color: #CCCCCC;
    transition: .4s ease-in-out;
    border-radius: 15px;

    &.active {
        background-color: #58D68D;
    }

    &::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 5px;
        bottom: 4px;
        background-color: #FFFFFF;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 100%;
        transform: translateX(0px)
    }

    &.active::before {
        transform: translateX(28px);
    }
`

export default SwitchField