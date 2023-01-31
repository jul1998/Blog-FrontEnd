import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/comments.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function Comments({postId}){

    const { store, actions } = useContext(Context);
    const [comments, setComments] = useState([])
    const [isExpanded, setIsExpanded] = useState(false);

    let isTokenExpired = actions.checkIfTokenExpired()
    let userId = localStorage.getItem("user_id")
    let navigate = useNavigate()

    useEffect(()=>{
        async function fetchComments(){
            let comments = await actions.genericFetch(`display_all_commnents/post_id/${postId}`)
            let jsonComments = await comments.json()
            setComments(jsonComments)
        }
       fetchComments()
    },[])


        
    

    console.log(comments)

    function showComments(){
        if (isTokenExpired){
            Swal.fire({
                title: 'Error!',
                text: 'You need to be logged in again since your session expired',
                icon: 'error',
                confirmButtonText: 'Cool'
              }).then((result) => {
                if (result.value) {
                    return navigate("/login")
                }})
        }else{
            if(Array.isArray(comments)){
                return (comments.map((comment, index)=>{
                    return(
                    <div>
                        <div className="d-flex flex-column mb-3">
    
                        <div className="d-flex justify-content-center">
                            {comment.comment_author.id == userId?<i onClick={()=>alert("Delete")} className="fa-regular fa-x"></i>:null}                    
                        </div>
                        <div className="p-2">Posted by <strong>{comment.comment_author.name}</strong>  <small> at {comment.created_at}</small></div>
                        <div className="p-2">{isExpanded ?comment.comment:comment.comment.slice(0, 100)}
                      {comment.comment.length >100&& <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="comment-read-more-btn">
                        {isExpanded ? 'Show less' : '... Read more'}
                      </button>}</div>

                      <div style={{ borderBottom: "1px solid black" }} />
                      </div>
                    </div>
                    
                    )
                }))
                
            }else{
                return <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
            }

    //Continue with the delete comment function
    
     

    }

    return(

        <div className="container">
            <h1>Comments</h1>
            <div className="comments-section">
            {showComments()}
            </div>
           
        </div>
        

    )
}