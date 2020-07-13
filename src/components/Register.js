import React, {useState} from "react";
import Banner from "./Banner";

const Register = ({registerNewUser, existingUser}) => {
    const [user,setUser] = useState({
        username: null,
        email: null,
        password: null,
        race: null}
        );

    const onUsernameChange = (value) => {
        user.username = value;
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
    const onSubmit = (e) => {
        e.preventDefault();
        setUser(user);
        registerNewUser(user);
    }

    return (
        <main>
            {!!existingUser ? <Banner text={'Username or email already in use. Please choose another!'}
                                      alertType={'ERROR'}
            /> : <div></div>}
            <form onSubmit={onSubmit}
                  className="measure center pa3 bg-black-70 mv5 shadow-5">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input className="pa2 input-reset ba w-100"
                               type="text" name="username" id="username" required
                               onChange={e => onUsernameChange(e.target.value)}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba w-100"
                               type="email" name="email-address" id="email-address"
                               onChange={e => onEmailChange(e.target.value)}
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba w-100"
                               type="password" name="password" id="password"
                               required
                               onChange={e => onPasswordChange(e.target.value)}
                        />
                    </div>
                </fieldset>

                <label classname = "db fw6 lh-copy f6" htmlFor="race-radio">Race</label>
                <div className="pa2 flex flex-wrap" id="race-radio">

                    <label className="f6 pa2 dib grow bg-animate b--transparent pv2 ph4 w-20">
                        <input required type="radio" name="race" value="HUMAN"  onChange={e => onRaceChange(e.currentTarget.value)}/> Human
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 w-20">
                        <input type="radio" name="race" value="ELF" onChange={e => onRaceChange(e.currentTarget.value)}/> Elf
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 w-20">
                        <input type="radio" name="race"
                               value="URGROSH" onChange={e => onRaceChange(e.currentTarget.value)}/> Urgrosh
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 w-20">
                        <input type="radio" name="race" value="DWARF" onChange={e => onRaceChange(e.currentTarget.value)}/> Dwarf
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 w-20">
                        <input type="radio" name="race" disabled={true} value="NORFS" onChange={e => onRaceChange(e.currentTarget.value)}/> Norff
                    </label>
                    <label className="f6 pa2 dib grow white bg-animate b--transparent pv2 ph4 w-20">
                        <input type="radio" name="race"disabled={true} value="FELIX" onChange={e => onRaceChange(e.currentTarget.value)}/> Felix
                    </label>
                </div>
                <div>
                    <button
                        className="mv3 f6 dib bg-dark-green grow white-90 bg-animate hover-green no-underline pv2 ph4 br-pill ba b--white-20"
                        type="submit"
                    >Register</button>
                </div>
            </form>
        </main>
    )
}
export default Register;