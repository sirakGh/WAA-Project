import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import LoginComponent from '../../components/login/Login'
import { authenticationService } from '../../services/authentication.service';

const Login = () => {
    const history = useHistory();
    useEffect(()=>{
        if(authenticationService.currentUserValue){
            history.push("/");
        }
    },[])
    return (
        <div>
            <LoginComponent />
        </div>
    );
}

export default Login;