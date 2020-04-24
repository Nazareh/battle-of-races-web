import React from "react";
import Navigation from "./Navigation";
import Login from "./Login";

const Home = ({isAuthenticated,login,logout}) => {

    return (
        <div>
            <Navigation isAuthenticated={isAuthenticated}
                        logout={logout} />
            <Login login={login} />
        </div>
    )
}

export default Home;