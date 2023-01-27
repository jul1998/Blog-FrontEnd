import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../styles/textEditor.css"
import jwtDecode from 'jwt-decode'


export default function TextEditor(){

    const { store, actions } = useContext(Context);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    
    let isExpired = actions.checkIfTokenExpired()

    const [postData, setPostData] = useState({
        title:"",
        subtitle: "",
        image: ""
    }
    )
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      )

      const [convertedContent, setConvertedContent] = useState(null);

      const userId = localStorage.getItem("user_id")

      useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
      }, [editorState]);
    
     function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html)
  }
}


function handleChange(event){
    const {name,value}= event.target //Destructurar data de formData
    setPostData(prevPostData =>{
        return{
            ...prevPostData, // Traer todo lo que se haya generado por el user
            [name]: value 
            
        }
    })
    }



async function handleSubmit(event){
    event.preventDefault();
    const {title, subtitle, image} = postData
    
    if(!title || !subtitle || !convertedContent ){
        setError('Title, content or subtitle is missing')
    }else{
        let bodyObj = {
            title: title,
            content: createMarkup(convertedContent).__html,
            subtitle: subtitle,
            post_img: image,
            author_id: userId
        }
    
        let response = await actions.genericFetchProtected("create_posts", "POST", bodyObj)
        let jsonResponse = await response.json()

        if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Great!',
              text: `${jsonResponse.message}`,
            })
            return navigate("/")
      
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${jsonResponse.msg + " Login again to avoid this error"}`,
            })
          }
        
    }

    


}


    return(
        <div className="container">
            {isExpired?<div class="alert alert-danger" role="alert">
                Token is expired. <Link to="/login" class="alert-link">Login again</Link>. Give it a click if you like.
            </div>:null}
            <div className="main-textEditor">

            <div className="form-floating mb-3">
                <input required onChange={handleChange} name="title" type="text" className="form-control" id="title" placeholder="name@example.com"/>
                <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating">
                <input required onChange={handleChange} name="subtitle" type="text" className="form-control" id="subtitle" placeholder="Password"/>
                <label htmlFor="subtitle">Subtitle</label>
            </div>

            {error && <p style={{color:"red"}}>{error}</p>}

            <div className="form-floating">
                <input onChange={handleChange} name="image" type="text" className="form-control" id="image" placeholder="Password"/>
                <label htmlFor="image">Img URL</label>
            </div>
            
            <div className="mt-5">
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <button onClick={handleSubmit} type="button" className="btn btn-primary my-2">Submit</button>
            </div>
           
            </div>

            

            <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}>
            </div>
        </div>
    )

}