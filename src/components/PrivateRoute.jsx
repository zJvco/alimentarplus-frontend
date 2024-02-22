import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

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
            <Outlet />
        ) : (
            <Navigate to="/login" />
        )
    )
}

export function PrivateRouteOng({ children }) {
    const { isAuthenticated, userType } = useAuth()

    return (
        (isAuthenticated && userType === "ong") ? (
            <Outlet />
        ) : (
            <Navigate to="/login" />
        )
    )
}