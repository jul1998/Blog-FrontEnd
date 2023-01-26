import React, { useState, useContext,useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function LogoutFunction(){
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [logoutModal, setLogoutModal] = useState(false);

    async function logoutRequest(){
        let response = await actions.logoutFetch()
        console.log(await response.json())    
        
    }

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.value) {
                // Perform logout logic here
                logoutRequest()
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'You have been logged out',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: true
                })
                return navigate("/")
            }
        })
    }

    return(
        <>
<a  onClick={handleLogout} className="nav-link px-lg-3 py-3 py-lg-4"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Logout
</a>

        </>
    )
}

