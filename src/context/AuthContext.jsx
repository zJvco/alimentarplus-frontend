import { createContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../api/config";
import { storeJWTToken, getJWTToken, clearJWTToken } from "../utils/token";
import { notify } from "../utils/notify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        getJWTToken()
    )
    const [userId, setUserId] = useState()

    const queryClient = useQueryClient()

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
            console.log("Hello")
            if (!userId) return

            return getUser(userId)
        },
        refetchOnWindowFocus: false
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
    }

    const loginMutation = useMutation(login, {
        onSuccess: (data) => {
            queryClient.invalidateQueries("login")
            queryClient.invalidateQueries("users")

            storeJWTToken(data.token)
            const { sub } = jwtDecode(data.token)
            setUserId(sub)
            
            window.location.href = "/"
        },
        onError: () => {
            notify("Usuário ou senha incorretos", "error")
        }
    })

    const logoutMutation = useMutation(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries("users")
            queryClient.invalidateQueries("login")
        },
        onError: () => {
            notify("Não foi possível deslogar o usuário", "error")
        }
    })

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoading,
            login: loginMutation.mutate,
            logout: logoutMutation.mutate
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;