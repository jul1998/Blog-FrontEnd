import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Header from "../header.jsx";
import postbg from "../../../img/post-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'



export default function DeletePostBtn({postId}){

    const navigate = useNavigate()
    const { store, actions } = useContext(Context);

    async function deleteRequest(){
        let response = await actions.genericFetchProtected(`delete_post/${postId}`, "DELETE")
        let jsonResponse = await response.json()
    }

    async function handleRequest(){
        Swal.fire({
            title: 'Are you sure you want to delete this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // Perform logout logic here
                deleteRequest()
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'You have deleted this post',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: true
                })
                return navigate("/")
                
            }
        })
        

    }

    

    return (
        <button onClick={handleRequest} className="btn btn-danger">Delete Post</button>
    )
}