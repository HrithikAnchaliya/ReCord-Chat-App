import React from 'react'
import GoogleLogin from 'react-google-login';
import '../Style/Login.css'
import axios from 'axios'
import Serialize  from '../Components/Functions/functions';
import { useDispatch } from 'react-redux'
import { Add_User } from '../Redux/Action/action';


function LoginWithGoogle() {

const dispatch = useDispatch()

const handleLogin = async googleData => {
    try{
        let token = googleData.tokenId;
        const {  data  } = await axios.post("https://re-cord.herokuapp.com/api/v1/auth/google", { token });
        Serialize(data);
        dispatch(Add_User());
    } catch(e) {
        console.log(e);
    }
}

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default LoginWithGoogle;