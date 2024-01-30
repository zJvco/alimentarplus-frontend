import styled from "styled-components";

const Container = styled.div`

`

const Title = styled.h1`

`

const AllSupermarketsContainer = styled.div`
    margin: 20px 0;
`

const InfosContainer = styled.div`

`

const SupermarketLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: unset;
    
    &:hover {
        text-decoration: none;
        color: unset;
    }
`

const SupermarketImageContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #CCC;
`

const SupermarketImage = styled.img`

`

const SupermarketName = styled.span`
    margin-left: 10px;
`

const ProductsContainer = styled.div`
    
`

const ProductsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 20px 0;
`

const ProductRow = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-right: 20px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.lightHover};

    &:hover {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }
`

const ProductLink = styled.a`
    text-decoration: none;
    color: unset;

    &:hover {
        text-decoration: none;
        color: unset;
    }
`

const ProductImage = styled.img`
    width: 200px;
    height: 160px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const ProductInformations = styled.div`
    padding: 5px 10px;
    margin-bottom: 10px;
`

const ProductName = styled.p`
    font-weight: bold;
`

const ProductQuantity = styled.p`

`

export default {
    Container,
    Title,
    InfosContainer,
    ProductImage,
    ProductInformations,
    ProductName,
    ProductQuantity,
    ProductsContainer,
    ProductsList,
    SupermarketLink,
    SupermarketImageContainer,
    SupermarketImage,
    SupermarketName,
    AllSupermarketsContainer,
    ProductRow,
    ProductLink
}