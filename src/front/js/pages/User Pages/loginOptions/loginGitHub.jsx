import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext";
import Header from "../../../component/header.jsx";
import Swal from 'sweetalert2'
import { useNavigate, Link } from "react-router-dom";

export default function LoginGitHub(){

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const CLIENT_ID = "e705e438ff461162c04b"

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code")
        console.log(code)

            
    }, [])

    function loginWithGitHub(code){
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
    }


    return(
        <div>
            <i onClick={loginWithGitHub} className="fab fa-github"></i>
        </div>
    )
}