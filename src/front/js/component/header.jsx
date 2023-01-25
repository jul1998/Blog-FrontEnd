import React from "react";
import { Link } from "react-router-dom";
 

function Header({title,imgUrl, subtitle}){
    return(
        <header className="masthead" style={{backgroundImage: `url(${imgUrl})`}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{title?title: "Programming Blog"}</h1>
                            <span className="subheading">{subtitle?subtitle:"Blog Created by Julian"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header