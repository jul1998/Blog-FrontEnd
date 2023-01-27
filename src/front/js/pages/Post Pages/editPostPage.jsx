import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Posts from "../../component/Post Comp/postsComp.jsx";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header.jsx";
import TextEditor from "../../component/Post Comp/textEditorComp.jsx";
import EditPostBtn from "../../component/Post Comp/editPostComp.jsx";

export default function EditPost(){

    let img = "https://cdn.pixabay.com/photo/2016/09/15/18/35/update-1672385__480.jpg"

    return(
        <>
        <Header imgUrl={img} title={"Edit post"} subtitle={"Here you can edit a post!"}/>
        <div className="textEditor-body">
        <TextEditor/>
        
        </div>

        </>
    )
}