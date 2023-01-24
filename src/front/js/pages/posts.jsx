import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Posts from "../component/Post Comp/postsComp.jsx";

function DisplayPosts(){
    return(
        <Posts/>
    )
}

export default DisplayPosts