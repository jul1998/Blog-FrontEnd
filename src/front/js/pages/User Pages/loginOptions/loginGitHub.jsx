import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../store/appContext";
import Header from "../../../component/header.jsx";
import Swal from 'sweetalert2'
import { useNavigate, Link } from "react-router-dom";

export default function LoginGitHub(){

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const CLIENT_ID = process.env.CLIENT_ID


	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const code = urlParams.get("code");
		console.log(code)
        if(code){
           async function getAccessToken(){
            let response = await actions.loginWithGitHub("github-auth?code=" + code, "GET")
            let jsonRes = await response.responseJson 
            if (response.response.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `${jsonRes.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/")
            }
           }
            getAccessToken()
        }
        
	},[])

    function loginWithGitHub() {
        window.location.assign(
          "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
        );

        
       
      }


    return(
        <div>
            <i onClick={loginWithGitHub} className="fab fa-github"></i>
        </div>
    )
}