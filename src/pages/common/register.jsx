import React, {useEffect} from 'react';
import { useHistory } from 'react-router';
import Signup from '../../components/Signup/Signup'
import { authenticationService } from '../../services/authentication.service';
const Register = () => {
    const history = useHistory();
    useEffect(()=>{
        if(authenticationService.currentUserValue){
            history.push("/");
        }
    },[])
    return (
        <div>
            <Signup />
        </div>
    );
}

export default Register;