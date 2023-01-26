import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Posts from "../../component/Post Comp/postsComp.jsx";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/header.jsx";
import TextEditor from "../../component/Post Comp/textEditorComp.jsx";

export default function CreatePost(){

    let img = "https://images.unsplash.com/photo-1461344577544-4e5dc9487184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

    return(
        <>
        <Header imgUrl={img} title={"Create a post"} subtitle={"Here you can create your own post!"}/>
        <TextEditor/>
        </>
    )
}