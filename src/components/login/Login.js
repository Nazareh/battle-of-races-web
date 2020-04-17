import React, {useEffect, useState} from "react";

import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import './Login.css';

const Login = () =>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser] = useState({email : ''});
    const [token,setToken] = useState('false');

    const logout = () => {
        setIsAuthenticated(false);
        setToken('');
        setUser(null);
    };
    const onFailure = (error) => {
        alert(error);
    }
    const twitterResponse = (e) => {};

     const facebookResponse = async (response) => {
         await setIsAuthenticated(true);
         await setToken(response.accessToken);
         const usuario = response;
          await setUser({
            name: response.name ,
            email: response.email}
            );
    };


    useEffect(() => {
    },[user]);

    const googleResponse = (e) => {};
    return(
        !!isAuthenticated ?
            <div className="flex justify-end">
                    <button onClick={logout} className="loginBtn loginBtn--logout">
                        Log out
                    </button>
            </div>
            :
            <div className="flex justify-end">
                {/*<TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"*/}
                {/*              onFailure={twitterResponse} onSuccess={twitterResponse}*/}
                {/*              requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/>*/}
                <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={facebookResponse}
                    cssClass="loginBtn loginBtn--facebook"/>
                <GoogleLogin
                    clientId="XXXXXXXXXX"
                    buttonText="Login"
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                    />
            </div>
    )
};

export default Login;