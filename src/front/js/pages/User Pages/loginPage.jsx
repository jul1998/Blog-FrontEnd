import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Header from "../../component/header.jsx";
import Swal from 'sweetalert2'
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    let img = "https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  
  
    //let response = actions.login()
    //let res1 = store.user
    //console.log(res1)
  
    const [formData, setFormData] = useState({
      password:"",
      email: "",
  }
  )

  function handleChange(event){
    const {name,value}= event.target //Destructurar data de formData
    setFormData(prevFormData =>{
        return{
            ...prevFormData, // Traer todo lo que se haya generado por el user
            [name]: value 
            
        }
    })
    }

    console.log(formData)

    async function login (event){
        event.preventDefault()
        const {password, email} = formData
    
        let bodyObj = {
            password: password,
            email:email
        }
    
        let loginResponse = await actions.login("login","POST",bodyObj) //Get two variables: 1.response, 2.responseJson
        let jsonRes = await loginResponse.responseJson // Here we access to the property responseJson from object response
        //that contains token, msg. email from user
        
        if (loginResponse.response.ok){ 
            Swal.fire({
                icon: 'success',
                title: 'Great!',
                text: `${jsonRes.message}`,
              })
            createProtectedRoute()
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${jsonRes.message}`,
              })
        }
    }

    async function createProtectedRoute(){
        let response = await actions.genericFetchProtected("user_access_protected") // Get reponse object
        if (response.ok){
          console.log("Protected route")
          return navigate(`/`) // We use the property user_id from response in route
          // user_access_protected located in backend
        }
        
      }

  return(
        <>
        <Header imgUrl={img} title={"Login"} subtitle={"Please, fill this form to login"}/>
            <div class="container text-center">
  <div class="row">
    <div class="col">
     
    </div>
    <div class="col-6">
    <form onSubmit={login}>
 
  <div class="form-outline mb-4">
    <input required onChange={handleChange} name="email" type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>


  <div class="form-outline mb-4">
    <input required onChange={handleChange} name="password" type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>


  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
    
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example34" />
        <label class="form-check-label" for="form2Example34"> Remember me </label>
      </div>
    </div>

    <div class="col">
  
      <a href="#!">Forgot password?</a>
    </div>
  </div>


  <button type="submit" class="btn btn-primary btn-block mb-4">Login</button>


  <div class="text-center">
    <p>Not a member? <Link to="/signup">Register</Link></p>
    <p>or sign up with:</p>
    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>
    </div>
    <div class="col">
     
    </div>
  </div>
  <div class="row">
    <div class="col">
      
    </div>
    <div class="col-5">
      
    </div>
    <div class="col">
      
    </div>
  </div>
</div>
        </>

  )
}

export default Login