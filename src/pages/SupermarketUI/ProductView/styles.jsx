import styled from "styled-components";

const Container = styled.div`

`

const TitleProductName = styled.h2`

`

const SubtitleProductID = styled.p`
    color: ${props => props.theme.colors.borderColor};
`

const Form = styled.form`
    margin: 25px 0;
`

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: 20%;
    float: right;
`

const CancelButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0 20px;
`

export default {
    Container,
    Form,
    SubtitleProductID,
    TitleProductName,
    ActionsContainer,
    CancelButton
}