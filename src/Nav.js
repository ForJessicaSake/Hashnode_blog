import React from "react";
import { Link } from "react-router-dom";

function Nav(){
return(
    <nav className="flex justify-between m-6 shadow-lg h-16 mb-16 items-center px-8">
        <h1 className="text-4xl font-extrabold">
     Jessica's Blog
        </h1>
        <ul className="flex justify-between w-64">
            <li>Portfolio</li>
            <li><a href= "https://github.com/ForJessicaSake">Github</a></li>
        </ul>
    </nav>
)
}

export default Nav;