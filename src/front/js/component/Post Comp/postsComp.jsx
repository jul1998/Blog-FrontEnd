import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Header from "../header.jsx";
import postbg from "../../../img/post-bg.jpg";
import { Link } from "react-router-dom";


function Posts({postId}){
    const { store, actions } = useContext(Context);
    const [content, setContent] = useState([])
    let token = localStorage.getItem("token")

    useEffect(()=>{
        async function fetch() {
            let response = await actions.genericFetchProtected(`post/${postId}`)
            let jsonResponse = await response.json()
            setContent(jsonResponse);
            console.log(content)
          }
          fetch();
    },[])
    
    console.log(content)


    return(
        <div>
           
            <Header subtitle={content.subtitle} title={content.title} imgUrl={content.post_img}/>
            {token?  <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div dangerouslySetInnerHTML={{__html: content.content}} />
                        <h2 className="section-heading">{content.subtitle}</h2>
                        
                        
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