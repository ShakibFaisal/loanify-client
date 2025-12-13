import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';

import { AuthContext } from '../Provider/AuthContext';
import Loader from '../Components/Loader/Loader';


const PrivetRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    const location =useLocation()
    if (loading) {
        return  <Loader></Loader>
        
    }
    if (user) {
        return children;
    }
    return <Navigate state={location?.pathname} to={'/login'}></Navigate>
};

export default PrivetRoute;