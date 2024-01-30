import styled from "styled-components";

const Container = styled.div`

`

const SectionTitle = styled.h5`
    font-size: 18px;
`

// 
const HeaderInfoSection = styled.div`

`

const ProductNameText = styled.h2`
    font-weight: normal;
`

const ProductIdText = styled.span`
    color: ${props => props.theme.colors.borderColor};
`

// 
const ProductInfoSection = styled.div`
    margin: 30px 0;
`

const ProductInfoContainer = styled.div`
    display: flex;
    margin: 20px 0;
`

const ProductImage = styled.img`
    width: 230px;
    height: 230px;
    object-fit: cover;
    background-color: #CCCCCC;
    border-radius: 10px;
`

const ProductSideInfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const ProductInfoContentBox = styled.div`
    margin: 5px 25px;
`

const ProductInfoContentBoxTitle = styled.span`
    display: block;
    font-weight: bold;
`

const ProductInfoContentBoxValue = styled.span`
    display: block;
    margin: 8px 0;
`

// 
const ProductLocalizationSection = styled.div`

`

const ProductLocalizationContentContainer = styled.div`
    margin: 10px 0;
`

const AddressInfoText = styled.span`

`

const LocalizationMapLink = styled.a`

`

const LocalizationMapImage = styled.img`
    width: 100%;
`

const LocalizationLinkHowToGetThere = styled.a`
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;

    &:hover {
        text-decoration: none;
    }
`

// Popup
const PopupBackground = styled.div`
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

const PopupContainer = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 10px;
    max-width: 600px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
`

const PopupTitle = styled.span`
    display: block;
    font-size: 18px;
    font-weight: bold;
`

const PopupText = styled.span`
    display: block;
    margin-top: 10px;
    margin-bottom: 100px;
`

const PopupActions = styled.div`
    display: flex;
`

export default {
    Container,
    SectionTitle,
    HeaderInfoSection,
    ProductIdText,
    ProductInfoSection,
    ProductLocalizationSection,
    ProductNameText,
    ProductInfoContainer,
    ProductImage,
    ProductSideInfoContainer,
    ProductInfoContentBox,
    ProductInfoContentBoxTitle,
    ProductInfoContentBoxValue,
    AddressInfoText,
    ProductLocalizationContentContainer,
    PopupBackground,
    PopupContainer,
    PopupTitle,
    PopupText,
    PopupActions,
    LocalizationMapLink,
    LocalizationMapImage,
    LocalizationLinkHowToGetThere
}