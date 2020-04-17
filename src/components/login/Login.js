import React, {useEffect} from "react";

// import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
// import {GoogleLogin} from 'react-google-login';
import config from '../../config.json';
import './Login.css';

const Login = ({isAuthenticated, login, logout}) => {
    // const onFailure = (error) => {
    //     alert(error);
    // }
    // const twitterResponse = (e) => {
    // };
    // const googleResponse = (e) => {
    // };

    const facebookResponse = async (response) => {
        login({
            authenticated: true,
            email: response.email
        })
    };

    useEffect(() => {
    }, [isAuthenticated]);

    return (
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
                {/*<GoogleLogin*/}
                {/*    clientId="XXXXXXXXXX"*/}
                {/*    buttonText="Login"*/}
                {/*    onSuccess={googleResponse}*/}
                {/*    onFailure={googleResponse}*/}
                {/*    />*/}
            </div>
    )
};

export default Login;