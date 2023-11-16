import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

export function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth()

    return (
        isAuthenticated ? (
            children
        ) : (
            <Navigate to="/login" />
        )
    )
}

export function PrivateRouteSupermarket({ children }) {
    const { isAuthenticated, userType } = useAuth()

    return (
        (isAuthenticated && userType === "supermarket") ? (
            children
        ) : (
            <Navigate to="/login" />
        )
    )
}

export function PrivateRouteOng({ children }) {
    const { isAuthenticated, userType } = useAuth()

    return (
        (isAuthenticated && userType === "ong") ? (
            children
        ) : (
            <Navigate to="/login" />
        )
    )
}