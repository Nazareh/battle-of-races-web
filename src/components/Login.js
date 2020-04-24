import React from "react";
import {navigate} from 'hookrouter';

const Login = ({login}) => {
    let username = null;
    let password = null;

    const onUsernameChange = (value) => {
        username = value;
    }
    const onPasswordChange = (value) => {
        password = value;
    }
    return (
        <main className="black-80">
            <div className="measure center white pa3 shadow-5">
                <fieldset id="login" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Login</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input className="pa2 input-reset ba bg-black-80 white w-100"
                               type="text" name="username" id="username"
                               onChange={e => onUsernameChange(e.target.value)}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bg-black-80 ba white w-100"
                               type="password" name="password" id="password"
                               onChange={e => onPasswordChange(e.target.value)}
                        />
                    </div>
                </fieldset>
                <div className="">
                    <input
                        className="f6 dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                        type="submit" value="Login"
                        onClick={() => {
                            login({username:username,password:password});
                        }}/>
                </div>
            </div>
        </main>
    )
};

export default Login;