import React from 'react'
import styled from 'styled-components'

function RadioField({ value, label, className, id, onChange, name }) {
    return (
        <Container>
            <Input
                type='radio'
                value={value}
                className={className}
                id={id}
                onChange={onChange}
                name={name}
            />

            {label && <Label htmlFor={id}>{label}</Label>}
        </Container>
    )
}

const Input = styled.input`
    display: block;
`

const Label = styled.label`
    display: block;
    margin: 0 4px;
`

const Container = styled.div`
    display: flex;
    margin-right: 10px;
`

export default RadioField