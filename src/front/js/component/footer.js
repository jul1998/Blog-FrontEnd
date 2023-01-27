import React, { Component } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGitlab, FaGithub } from 'react-icons/fa';



export function Footer() {
		return (
		  <footer style={{marginTop:"250px"}} className="bg-dark text-light py-5">
			<div className="container">
			  <div className="row">
				<div className="col-md-4">
				  <h3 className="mb-4">Follow Me</h3>
				  <div className="d-flex">
					<a href="#" className="text-light mr-3">
					<FaFacebook size={30} />
					</a>
					<a href="https://www.linkedin.com/in/juli%C3%A1n-guevara/" className="text-light mr-3">
					<FaLinkedin size={30} />

					</a>
					<a href="https://github.com/jul1998" className="text-light mr-3">
					<FaGithub size={30} />
					</a>
				  </div>
				</div>
				<div className="col-md-4">
				  <h3 className="mb-4">Links</h3>
				  <ul className="list-unstyled">
					<li><a href="#" className="text-light">Home</a></li>
					<li><a href="#" className="text-light">About</a></li>
					<li><a href="#" className="text-light">Contact</a></li>
				  </ul>
				</div>
				<div className="col-md-4">
				  <h3 className="mb-4">Contact Me</h3>
				  <form>
					<div className="form-group">
					  <input type="email" className="form-control" placeholder="Email" />
					</div>
					<div className="form-group">
					  <textarea className="form-control" rows="3" placeholder="Message"></textarea>
					</div>
					<button className="btn btn-primary">Send</button>
				  </form>
				</div>
			  </div>
			</div>
		  </footer>
		);
	  }
