import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Header from "../header.jsx";
import postbg from "../../../img/post-bg.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

export default function EditPostBtn({title, subtitle, content, post_img}){
    
    const navigate = useNavigate()
    let params = useParams()

    const { store, actions } = useContext(Context);


    async function editRequest(){
        console.log(post_img)
        let bodyObj = {
            'title': title,
            "content": content,
            "post_img": post_img,
            "subtitle":subtitle
            
        }

        let response = await actions.genericFetchProtected(`edit_post/${params.postid}`, "PUT", bodyObj)
        let jsonResponse = await response.json()
        console.log(jsonResponse)
    }

    function handleRequest(){
        Swal.fire({
            title: 'Are you sure you want to edit this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Accept!'
        }).then((result) => {
            if (result.value) {
                // Perform logout logic here
                editRequest()
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: 'You have edited this post. Reload page to view changes.',
                    showConfirmButton: false,
                    timer: 2000,
                    allowEscapeKey: true
                })
                return navigate(`/posts/${params.postid}`)
                
            }
        })}

    return(
        <div class="d-grid gap-2">
  <button type="button" onClick={handleRequest} className="btn btn-info">Edit Post</button>
    </div>
        
    )
}