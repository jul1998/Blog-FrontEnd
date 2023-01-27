import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import {Signup} from "./pages/signup.jsx"; //Component to register user
import injectContext from "./store/appContext";
import DisplayPosts from "./pages/Post Pages/posts.jsx";
import SignupForm from "./pages/User Pages/signupPage.jsx";
import Login from "./pages/User Pages/loginPage.jsx";
import CreatePost from "./pages/Post Pages/createPostPage.jsx";
import EditPost from "./pages/Post Pages/editPostPage.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<DisplayPosts />} path="/posts/:postid" />
                        <Route element={<SignupForm />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<CreatePost />} path="/createPost" />
                        <Route element={<EditPost />} path="/editPost/:postid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
