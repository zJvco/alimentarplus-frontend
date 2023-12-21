import styled from "styled-components";

const OverviewContainer = styled.div`
    background-color: #F2F2F2;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`

const OverviewTitle = styled.h2`

`

const OverviewSubtitle = styled.p`

`

const OverviewContenContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

const OverviewDataBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    padding: 15px;
    border-radius: 5px;
    width: 250px;
    height: 150px;
    margin: 10px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`

const OverviewDataBoxTitle = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
`

const OverviewDataBoxContent = styled.p`
    font-size: 18px;
    color: ${props => props.theme.colors.primary};
`

export default {
    OverviewContainer,
    OverviewTitle,
    OverviewContenContainer,
    OverviewDataBox,
    OverviewDataBoxTitle,
    OverviewDataBoxContent,
    OverviewSubtitle
}