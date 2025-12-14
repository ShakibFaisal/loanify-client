import React, { useContext } from 'react';




import { AuthContext } from '../../Provider/AuthContext';
import Loader from '../../Components/Loader/Loader';
;
import Forbidden from '../../Error/Forbidden';
import useRole from '../../Hooks/UseRole';

const AdminRoute = ({ children }) => {
    const { loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loader></Loader>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;