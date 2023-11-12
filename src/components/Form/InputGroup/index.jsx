import React from 'react'
import styled from 'styled-components'

function InputGroup({ children, verticalAlignment, margin }) {
    return (
        <>
            {verticalAlignment ? (
                <ContainerVertical style={{ margin: margin }}>
                    {children}
                </ContainerVertical>
            ) : (
                <ContainerHorizontal style={{ margin: margin }}>
                    {children}
                </ContainerHorizontal>
            )
            }
        </>
    )
}

const ContainerVertical = styled.div`
    display: flex;
    flex-direction: column;
`

const ContainerHorizontal = styled.div`
    display: flex;
    flex-direction: row;
`

export default InputGroup