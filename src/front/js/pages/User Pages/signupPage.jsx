import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Header from "../../component/header.jsx";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";



function SignupForm(){
  let img= "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"

  const { store, actions } = useContext(Context)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: "",
    password: "",
    confirmPassword: "",
    email: "",
    userType: "",
    newsLetter: "",
    phone: "",
    address: ""
  }
  )

  const [error, setError] = useState('');



  function handleChange(event) {
    console.log("handle func")
    const { name, value, type, checked } = event.target //Destructurar data de formData
    setFormData(prevFormData => {
      return {
        ...prevFormData, // Traer todo lo que se haya generado por el user
        [name]: type === "checkbox" ? checked : value // Si el type del input es checkbox, retorne un boolean,
        // de lo contrario, retorne el valor digitado por user
      }
    })
  }

  console.log(formData)

  async function handleSubmit(event){
    event.preventDefault();
    if (formData.password !== formData.confirmPassword || formData.password.length< 4) {
      setError('Passwords do not match or is less than 4 characters.');
    } else {
      setError('');
      // Perform the signup logic here
      const { fullname, password, email } = formData

      let bodyObj = {
        email:email,
        name:fullname,
        password:password
      }

      let response = await actions.genericFetch("signup", "POST", bodyObj)
      let jsonResponse = await response.json() // Get msg from backend endpoint
      console.log(jsonResponse)

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: `${jsonResponse.message}`,
        })
        return navigate("/login")
  
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${jsonResponse.message}`,
        })
      }
    }
  }



    return(
        <>
        <Header imgUrl={img} title={"Sign Up"} subtitle={"Please, fill this form to sign up"}/>
        <section className="vh-100" >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input required onChange={handleChange} name="fullname" type="text" id="form3Example1c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input required onChange={handleChange} name="email" type="email" id="form3Example3c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input required onChange={handleChange} name="password" type="password" id="form3Example4c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input required onChange={handleChange} name="confirmPassword" type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                      
                    </div>
                    
                  </div>
                  {error && <p style={{color:"red"}}>{error}</p>}
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input onChange={handleChange} name="newsLetter" className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        
        </>
    )
}

export default SignupForm