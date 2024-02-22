import React from 'react'
import styled from 'styled-components'

function InputGroup({ children, verticalAlignment, margin, title }) {
    return (
        <MainContainer style={{ margin: margin }}>
            { title && <Title>{title}</Title>}

            {verticalAlignment ? (
                <ContainerVertical>
                    {children}
                </ContainerVertical>
            ) : (
                <ContainerHorizontal>
                    {children}
                </ContainerHorizontal>
            )
            }
        </MainContainer>
    )
}

const MainContainer = styled.div`
`

const ContainerVertical = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerHorizontal = styled.div`
    display: flex;
    flex-direction: row;
`

const Title = styled.span`
    margin-bottom: 5px;
`

export default InputGroup