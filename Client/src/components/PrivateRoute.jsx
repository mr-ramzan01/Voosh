import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Loader } from './Loader';


export const PrivateRoute = ({children}) => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading===false && !isAuth) {
        return <Navigate to='/login'/>
    }
    return isLoading?<Loader/>:children;
}