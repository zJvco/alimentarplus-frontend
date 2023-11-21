import styled from "styled-components";

const TransparentBackground = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1000;
`

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 60%;
    height: 100vh;
    background-color: #FFFFFF;
    padding: 30px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h2`

`

const Form = styled.form`
    margin: 20px 0;
`

const CancelButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 20px;
`

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`

export default {
    Container,
    TransparentBackground,
    Form,
    Title,
    Header,
    CancelButton,
    ActionsContainer
}