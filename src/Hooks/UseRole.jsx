
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import UseAxiosSecure from './UseAxiosSecure';
import { AuthContext } from '../Provider/AuthContext';


const UseRole = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default UseRole;
