import styled from "styled-components";

const Container = styled.div`

`

const Title = styled.h1`

`

const ProductsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0;
`

const ProductImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    background-color: #CCCCCC;
    border-radius: 8px;
`

const ProductContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
`

const ProductCard = styled.div`
    display: flex;
    margin: 15px;
`

const ProductNameText = styled.span`
    display: block;
`

const ProductOwnerText = styled.span`
    display: block;
`

const ProductUnitsAvailableText = styled.span`
    display: block;
`

const ProductContent = styled.div`

`

const ProductContentFooter = styled.div`

`

export default {
    Container,
    Title,
    ProductCard,
    ProductImage,
    ProductContentContainer,
    ProductNameText,
    ProductOwnerText,
    ProductUnitsAvailableText,
    ProductsList,
    ProductContent,
    ProductContentFooter,
}