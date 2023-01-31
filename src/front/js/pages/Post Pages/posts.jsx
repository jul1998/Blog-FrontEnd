import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Posts from "../../component/Post Comp/postsComp.jsx";
import { Link, useParams } from "react-router-dom";
import Comments from "../../component/Post Comp/commentsComp.jsx";
function DisplayPosts(){

    let params = useParams()
    console.log(params.postid)

    return(
            <div>
            <Posts postId={params.postid}/>
            <Comments postId={params.postid}/>
            </div>
            
            
     
    
    )
}

export default DisplayPosts