import React from "react";
import Navigation from "./Navigation";
import Banner from "./Banner";

const Register = ({registerNewUser, existingUser}) => {
    const user = {
        name: null,
        email: null,
        password: null,
        race: null
    };
    const onUsernameChange = (value) => {
        user.name = value;
    }
    const onEmailChange = (value) => {
        user.email = value;
    }
    const onPasswordChange = (value) => {
        user.password = value;
    }
    const onRaceChange = (value) => {
        user.race = value;
    }
    const onSubmit = () => {
        registerNewUser(user);
    }

    return (
        <main className="black-80">
            <Navigation/>
            {!!existingUser ? <Banner text={'Username or email already in use. Please choose another!'}
                                      alertType={'ERROR'}
            /> : <div></div>}
            <div className="measure center white pa3 shadow-5">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input className="pa2 input-reset ba bg-black-80 hover-white white w-100"
                               type="text" name="username" id="username"
                               onChange={e => onUsernameChange(e.target.value)}/>
                    </div>

                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-black-80 hover-white white w-100"
                               type="email" name="email-address" id="email-address"
                               onChange={e => onEmailChange(e.target.value)}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset bg-black-80 ba hover-white white  w-100"
                               type="password" name="password" id="password"
                               onChange={e => onPasswordChange(e.target.value)}/>
                    </div>
                </fieldset>

                <div className="pa2 bg-black-80 flex flex-row justify-around w-auto">
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 ">
                        <input type="radio" name="race" value="HUMAN" onChange={e => onRaceChange(e.currentTarget.value)}/>Human
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 ">
                        <input type="radio" name="race" value="DWARF" onChange={e => onRaceChange(e.currentTarget.value)}/>Dwarf
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 ">
                        <input type="radio" name="race" value="NORFS" onChange={e => onRaceChange(e.currentTarget.value)}/>Norf
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 ">
                        <input type="radio" name="race" value="FELIX" onChange={e => onRaceChange(e.currentTarget.value)}/>Felix
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 ">
                        <input type="radio" name="race" value="ORCS" onChange={e => onRaceChange(e.currentTarget.value)}/>Orc
                    </label>
                </div>
                <div>
                    <input
                        className="mv3 f6 dib bg-black-80 grow white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                        type="submit" value="Register"
                        onClick={(e) => onSubmit()}/>
                </div>
            </div>
        </main>
    )
}
export default Register;