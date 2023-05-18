import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet, useLocation, useNavigate, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';


const PrivateRoute = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let navigate = useNavigate();
    let location = useLocation();
    return (
        loggedInUser.email ? <Outlet /> :
            <Navigate
                to={'/login'}
                state={{ from: location }} // <-- pass in route state
                replace
            />
    );
};

export default PrivateRoute;