import styled from "styled-components";

const transitionTime = 0.5

const Container = styled.nav`
    position: fixed;
    width: 120px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #FFFFFF;
    border-right: 1px solid ${props => props.theme.colors.borderColor};
    transition: all ${transitionTime}s ease-in-out;
    z-index: 1000;

    &.open {
        width: 200px;
    }
`

const Logo = styled.img`
    margin: 20px;
    width: 120px;
`

const LogoIcon = styled.img`
    width: 40px;
    margin: 20px;
`

const Links = styled.ul`
    margin: 15px 0;
    list-style-type: none;
    width: 100%;
`

const LinkContainer = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Link = styled.a`
    cursor: pointer;
    color: ${props => props.theme.colors.borderColor};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 12px;
    font-size: 20px;

    &:hover {
        text-decoration: none;
    }
`

const LinkTitleHelper = styled.div`
    overflow: hidden;
    justify-content: center;
    display: flex;
    position: relative;
`

const LinkTitle = styled.span`
    margin-left: 20px;
    font-size: 16px;
    color: ${props => props.theme.colors.black};
    visibility: hidden;
    transform: translateX(-120px);
    transition: all ${transitionTime}s ease-in-out;
    position: absolute;

    &.show {
        transform: translateX(0px);
        visibility: visible;
        position: static;
    }
`

export default {
    Container,
    Logo,
    Links,
    LinkContainer,
    Link,
    LinkTitle,
    LinkTitleHelper,
    LogoIcon
}