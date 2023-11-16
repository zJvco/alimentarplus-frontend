import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UseRedirect = () => {
    const navigate = useNavigate()

    const { isAuthenticated, userType } = useContext(AuthContext)

    useEffect(() => {
        if (isAuthenticated) {

            if (userType === "supermarket") {
                return navigate("/estabelecimento")
            }
            else if (userType === "ong") {
                return navigate("/ong")
            }
        }
        else {
            return navigate("/login")
        }
    }, [])
}

export default UseRedirect