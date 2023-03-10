import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import homeBg from "../../../img/home-bg.jpg";
import { Context } from "../../store/appContext";

function ShowMainContent(){
	const { store, actions } = useContext(Context);
    const [postsData, setPostsData] = useState([])

    useEffect(()=>{
        async function fetch() {
            
            let response = await actions.genericFetch("show_posts")
            let jsonResponse = await response.json()
            setPostsData(jsonResponse);
          }
          fetch();
    },[])


    function displayAllPosts(){
        return(postsData.map((post, index)=>{
            return(
                <div  key={index}>
                <div className="post-preview">
                    <Link to={`/posts/${post.id}`}>
                        <h2 className="post-title">{post.title}</h2>
                        <h3 className="post-subtitle">{post.subtitle}</h3> 
                    </Link>
                    <p className="post-meta">
                        Posted by 
                        <a href="#!"> {post.author_name} </a>
                        on {post.created_at.substring(0,16)}
                    </p>
                </div>
               
                <hr className="my-4" />
           
                
            </div>
            )
        }))
        
    }

    return (
        <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
                {postsData.length>0?displayAllPosts():
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Ups!</strong> Nothing to see here. <Link to="createPost">Create an account and start a post</Link>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                }
            </div>
        </div>
    </div>
    )
}

export default ShowMainContent