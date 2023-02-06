import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../store/appContext";
import "../../../../styles/comments.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export default function CommentTextArea(){



    const { store, actions } = useContext(Context);
    const userId = localStorage.getItem("user_id")
    const params = useParams()
    const [formData, setFormData] = useState({
        comment:""
      })

    function handleChange(event){
      const {name,value}= event.target //Destructurar data de formData
      setFormData(prevFormData =>{
          return{
              ...prevFormData, // Traer todo lo que se haya generado por el user
              [name]: value 
              
          }
      })
      }

    async function handleSubmit(event){
        event.preventDefault()
        const {comment} = formData
        let bodyObj = {
            comment: comment,
            comment_author_id: userId,
            post_id: params.postid
        }

      let response = await actions.genericFetchProtected("create_comment","POST",bodyObj)
      let jsonRes = await response.json()
      console.log(jsonRes)
      if(response.ok){
        await Swal.fire({
            title: 'Success!',
            text: `${jsonRes.message}`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          window.location.reload()
      }else{
        Swal.fire({
            title: 'Error!',
            text: `${jsonRes.message}` || `Something went wrong`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
      }}

      console.log(formData)
    return(
        <div className="comment-text-area">
        <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          name="comment"
          onChange={handleChange}
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Post Comment</Button> 
      </div>
    )
}

