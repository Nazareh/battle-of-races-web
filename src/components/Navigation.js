import React from "react";
import {navigate} from 'hookrouter';

export default function Navigation({isAuthenticated, logout}) {
    if(!isAuthenticated) {
       return (
           <nav className="flex bg-black-80 shadow-5 justify-end bb b--white-10">
               <div className="flex-grow pa3 flex flex-column items-center">
                   <a onClick={() => navigate('/')}
                      className="f6 link dib white fw6 dim mr3 mr4-ns pointer">Home</a>
               </div>
               <div className="flex-grow pa3 flex flex-column items-center">
                   <a onClick={() => navigate('/register')}
                      className="f6 link dib white fw6 dim mr3 mr4-ns pointer">Register</a>
               </div>
           </nav>
       )
   }
   else {
       return (
           <nav className="flex bg-black-80 shadow-5 justify-end bb b--white-10">
               <div className="flex-grow pa3 flex flex-column items-center">
                   <a onClick={() => {
                       logout();
                       navigate('/')
                   }}
                      className="f6 link dib white fw6 dim mr3 mr4-ns pointer">Logout</a>
               </div>
           </nav>
       )
   }
};