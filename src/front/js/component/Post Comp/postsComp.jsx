import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Header from "../header.jsx";
import { Link } from "react-router-dom";
import DeletePostBtn from "./deletePostComp.jsx";


function Posts({postId}){
    const { store, actions } = useContext(Context);
    const [content, setContent] = useState([])
    let token = localStorage.getItem("token")
    let userId = localStorage.getItem("user_id")


    useEffect(()=>{
        async function fetch() {
            let response = await actions.genericFetchProtected(`post/${postId}`)
            let jsonResponse = await response.json()
            setContent(jsonResponse);
          }
          fetch();
    },[])
    


    function checkIfuserCreatedPost(){
        if (content.author_id == userId){
            return(
                <>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                        <Link to={`/editPost/${postId}`}><button className="btn btn-info">Edit Post </button> </Link> 
                        </li>
                        <li className="nav-item">
                            <DeletePostBtn postId={postId}/>
                        </li>

                    </ul>
                </>
            )
        }else{
            
            return null
        }
    }



    return(
        <div>
            <Header subtitle={content.subtitle} title={content.title} imgUrl={content.post_img}/>
            {token?  <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                {checkIfuserCreatedPost()}
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {content.content?<div dangerouslySetInnerHTML={{__html: content.content}} />:<h1>This post was deleted or you need to login again</h1>}
                        
                        
                    </div>
                </div>
            </div>
        </article>: <div class="position-absolute top-100 start-50 translate-middle mt-5">
            <button className="btn btn-info"><Link to="/login">You need to login to see this content</Link></button>
            </div>}
        </div>
    )
}

export default Posts