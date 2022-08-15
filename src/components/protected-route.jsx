import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/auth-context'

const ProtectedRoute = () => {
    const {user} = UserAuth();
    if(!user) {
        return <Navigate to='/login' />
    }else{
        return <Navigate to='/' />
    }
}

export default ProtectedRoute