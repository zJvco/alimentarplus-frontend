import React from 'react'
import styled from 'styled-components'
import Button from './Form/Button'

function ConfirmationPopup({
    title,
    text,
    setClose,
    close,
    actionFn
}) {
    const handleNoButton = () => {
        setClose(!close)
    }

    const handleYesButton = () => {
        actionFn()
    }

    return (
        <TransparentBackground>
            <Popup>
                <PopupTitle>{title}</PopupTitle>
                <PopupText>{text}</PopupText>
                <PopupActions>
                    <Button type="button" className="danger" margin="0" onClick={handleNoButton} >NÃO</Button>
                    <Button type="button" margin="0 0 0 15px" onClick={handleYesButton}>SIM</Button>
                </PopupActions>
            </Popup>
        </TransparentBackground>
    )
}

const TransparentBackground = styled.div`
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Popup = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
`

const PopupTitle = styled.p`
    display: block;
    font-size: 18px;
    font-weight: bold;
`

const PopupText = styled.p`
    display: block;
    margin-top: 10px;
    margin-bottom: 100px;
`

const PopupActions = styled.div`
    display: flex;
`

export default ConfirmationPopup