import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Posts from "../../component/Post Comp/postsComp.jsx";
import { Link, useParams } from "react-router-dom";

function DisplayPosts(){

    let params = useParams()
    console.log(params.postid)

    return(
        <Posts postId={params.postid}/>
    )
}

export default DisplayPosts