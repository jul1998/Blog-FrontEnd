import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Header from "../component/header.jsx";
import ShowMainContent from "../component/Post Comp/homeComp.jsx";
import homeBg from "../../img/home-bg1.jpg";

export default function About(){

    let img ="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    return(
        <div>
            <Header imgUrl={img}/>

            <div className="container">
            <h1>Welcome to my programming blog!</h1>
  <p>This blog is dedicated to providing valuable insights, tutorials, and resources to help programmers of all skill levels improve their craft.</p>
  <p>As a full stack developer with experience in multiple programming languages and technologies, I strive to share my knowledge and experience with others through this platform.</p>
  <p>In this blog, you'll find a wide range of topics, from beginner-friendly tutorials to advanced discussions on the latest industry trends. Whether you're just starting out on your programming journey or are a seasoned veteran, you'll find something of value here.</p>
  <p>In addition to the technical side of programming, I also share my thoughts and experiences on the industry as a whole, including the latest news and developments, as well as my own career path and the lessons I've learned along the way.</p>
  <p>I hope this blog can be a valuable resource for you as you continue to improve your skills and knowledge as a programmer. If you have any questions, feedback, or just want to say hi, please don't hesitate to reach out. Thanks for visiting!</p>
            </div>
        </div>
    )
}