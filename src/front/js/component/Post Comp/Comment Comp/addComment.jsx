import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../../store/appContext";
import "../../../../styles/comments.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export default function CommentTextArea(){


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
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      </div>
    )
}

