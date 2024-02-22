import React from 'react'
import styled from 'styled-components'

function CustomToolTip({
    active,
    payload,
    label
}) {
    console.log(payload)

    if (active && payload && payload.length) {

        return (
            <Container>
                <Content>{payload[0].name}: {payload[0].value}</Content>
            </Container>
        )
    }

    return null
}

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
`

const Content = styled.div`
    color: #494949;
`

export default CustomToolTip