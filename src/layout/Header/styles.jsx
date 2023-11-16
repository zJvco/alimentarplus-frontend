import styled from "styled-components";

const Header = styled.header`
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UserTypeDisplay = styled.h2`
    font-size: 18px;
    font-weight: normal;
`

export default {
    Header,
    UserTypeDisplay
}