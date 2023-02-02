import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../store/appContext";
import "../../../../styles/comments.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'



export default function DeleteComment({comment_id}){

    const { store, actions } = useContext(Context);


    async function deleteCommentRequest(){
        let response = await actions.genericFetchProtected(`delete_comment/${comment_id}`, "DELETE")
        let jsonResponse = await response.json()
        if (response.ok){
           await Swal.fire({
                title: 'Success!',
                text: jsonResponse.message,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              window.location.reload()
            }

    }

    return(
        <div>
            <i onClick={()=>deleteCommentRequest()} className="fa-regular fa-x"></i>
        </div>

    )

}