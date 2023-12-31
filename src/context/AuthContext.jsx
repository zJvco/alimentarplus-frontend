import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../api/config";
import { storeJWTToken, getJWTToken, clearJWTToken } from "../utils/token";
import { notify } from "../utils/notify";
import { jwtDecode } from "jwt-decode";
import { ClipLoader } from 'react-spinners'
import theme from "../theme";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [userType, setUserType] = useState(null)

    const queryClient = useQueryClient()

    // Redirecionar usuário da página para tela de login
    useEffect(() => {
        let url = document.URL.trim()
        
        // Verifica se o usuário está na rota / OU estabelecimento OU ong
        if (url.charAt(url.length - 1) === '/' || url.split("/").slice(-1)[0] === "estabelecimento" || url.split("/").slice(-1)[0] === "ong") {
            window.location.href = "/login"
        }
    }, [isAuthenticated])

    const authDataFlow = () => {
        const _token = getJWTToken()

        setToken(_token)

        if (_token) {
            setIsAuthenticated(true)
            const { sub } = jwtDecode(_token)
            setUserId(sub)
        }
        else {
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        authDataFlow()
    }, [,token, isAuthenticated])

    const getUser = async (id) => {
        const response = await api.get("/users/" + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

        return response.data
    }

    // Obter dados do usuário
    const { isLoading, data: user } = useQuery(["users", { userId }], {
        queryFn: () => {
            if (!userId) return

            return getUser(userId)
        },
        onSuccess: (data) => {
            if (data?.id_supermarket) {
                setUserType("supermarket")
            }
            else if (data?.id_ong) {
                setUserType("ong")
            }
        },
        refetchOnWindowFocus: false,
        // enabled: !!userId
    })

    // Obter o token JWT
    const login = async (data) => {
        const formData = new FormData()

        formData.append("username", data.email)
        formData.append("password", data.password)

        const response = await api.post("/auth/login", formData, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        })

        return response.data
    }

    const logout = async () => {
        clearJWTToken()

        setIsAuthenticated(false)
    }

    const loginMutation = useMutation(login, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("login")
            queryClient.invalidateQueries("users")

            // Armazena o Token JWT no localstorage
            storeJWTToken(data.token)

            // Fluxo de autenticação
            authDataFlow()
        },
        onError: () => {
            notify("Usuário ou senha incorretos", "error")
        }
    })

    const logoutMutation = useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries("login")
            queryClient.invalidateQueries("users")
        },
        onError: () => {
            notify("Não foi possível deslogar o usuário", "error")
        }
    })

    if (loginMutation.isLoading) {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                Carregando...
                <br /><br />
                <ClipLoader color={theme.colors.primary} />
            </div>
        )
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            token,
            userType,
            isLoading,
            isAuthenticated,
            login: loginMutation.mutate,
            logout: logoutMutation.mutate
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;