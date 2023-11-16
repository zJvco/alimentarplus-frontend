import styled from "styled-components"
import { Link } from "react-router-dom"
import InputField from "../../../components/Form/InputField"
import Button from "../../../components/Form/Button"
import Banner from "../../../assets/kid eating.png"
import RadioField from "../../../components/Form/RadioField"
import InputGroup from "../../../components/Form/InputGroup"
import { useEffect, useState } from "react"
import { notify } from "../../../utils/notify"
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import UseRedirect from "../../../hooks/useRedirect"

function Login() {
    UseRedirect()

    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [radioType, setRadioType] = useState(null)

    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        login({ "email": email, "password": password })

        if (radioType == "supermarket") {
            navigate("/estabelecimento")
        }
        else if (radioType == "ong") {
            navigate("/ong")
        }
    }

    return (
        <Container>
            <Section style={{padding: "40px"}}>
                <Header>Alimentar+</Header>
                <FormContainer onSubmit={handleSubmit}>
                    <Title>Acesse sua conta</Title>
                    <InputField type="text" label="E-mail" onChange={(e) => setEmail(e.target.value)} />
                    <InputField type="password" label="Senha" onChange={(e) => setPassword(e.target.value)} />
                    <ForgotPasswordText>Esqueceu sua senha? <Link to={"/esqueci-a-senha"}>Clique aqui.</Link></ForgotPasswordText>
                    <InputGroup
                        margin="12px 0 0 0"
                    >
                        <RadioField
                            name="radio"
                            value="supermercado"
                            label="Supermercado"
                            id="radio-supermercado"
                            onChange={() => setRadioType("supermarket")}
                        />
                        <RadioField
                            name="radio"
                            value="ong"
                            label="ONG"
                            id="radio-ong"
                            onChange={() => setRadioType("ong")}
                        />
                    </InputGroup>
                    <Button type="submit">Entrar</Button>
                    <DontHaveAccountYetText>Ainda não tem conta? <Link to={"/cadastro"}>Cadastre-se já.</Link></DontHaveAccountYetText>
                </FormContainer>
                <Footer className='footer-text'>Alimentar+ ©2023 Copyright. Todos os direitos reservados.</Footer>
            </Section>
            <Section>
                <ImageRight src={Banner} alt="Criança Comendo" />
            </Section>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    max-height: 100vh;
`

const Section = styled.section`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Header = styled.header`

`

const FormContainer = styled.form`
    margin: 0 5% 120px 5%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    text-align: center;
    margin: 20px 0;
`

const Footer = styled.footer`
    text-align: center;
`

const DontHaveAccountYetText = styled.span`
    text-align: center;
`

const ForgotPasswordText = styled.span`

`

const ImageRight = styled.img`
    position: relative;
    width: 100%;
    height: 100vh;
    object-fit: cover;

    /* &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
    } */
`

const ChooseOrganizationType = styled.span`

`

export default Login