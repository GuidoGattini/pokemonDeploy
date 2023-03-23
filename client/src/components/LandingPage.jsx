import React from "react";
import {Link} from 'react-router-dom';
import "./landing.css"

export default function LandingPage(){
    return (
      
        <div className="landing">
            <h1>Bienvenidos a mi Página de pokemon </h1>
            <Link to='/home'>
                <button>Entrar</button>
            </Link>
       
        </div>
    )
}