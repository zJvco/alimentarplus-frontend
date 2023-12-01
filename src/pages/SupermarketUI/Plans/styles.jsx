import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Title = styled.h2`

`

const PlanCard = styled.div`
    background-color: #FCFCFC;
    border: 1px dashed ${props => props.theme.colors.borderColor};
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    width: 280px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4); */
`

const PlanTopSection = styled.div`
    display: flex;
    flex-direction: column;
`

const PlanName = styled.span`
    font-weight: bold;
    text-align: center;
`

const PlanBenefitsList = styled.ul`
    list-style-type: none;
    margin: 10px 0;
`

const PlanBenefitRow = styled.li`
    display: flex;
    align-items: center;
    margin: 5px 0;
`

const PlanBottomSection = styled.div`
    display: flex;
    flex-direction: column;
`

const PlanPriceDisplay = styled.span`
    text-align: center;
    margin: 6px 0;
    font-size: 12px;
`

const CurrentPlanTextDisplay = styled.span`
    text-align: center;
    font-size: 12px;
`

export default {
    Title,
    Container,
    PlanBenefitRow,
    PlanBenefitsList,
    PlanBottomSection,
    PlanCard,
    PlanName,
    PlanTopSection,
    PlanPriceDisplay,
    CurrentPlanTextDisplay
}