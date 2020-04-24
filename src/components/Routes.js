import React from "react";
import Register from "./Register";
import Login from "./Login";
import Navigation from "./Navigation";

const Routes = {
    "/": () =>
        <div>
                        <Navigation/>
                        <Login/>
    </div>,
    "/signup": () => <Register/>,
};

export default Routes;