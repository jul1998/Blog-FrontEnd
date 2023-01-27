import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import LogoutFunction from "./User Comp/logoutComp.jsx";

export const Navbar = () => {

	let token = localStorage.getItem("token")
	console.log(token)
	window.addEventListener('DOMContentLoaded', () => {
		let scrollPos = 0;
		const mainNav = document.getElementById('mainNav');
		const headerHeight = mainNav.clientHeight;
		window.addEventListener('scroll', function() {
			const currentTop = document.body.getBoundingClientRect().top * -1;
			if ( currentTop < scrollPos) {
				// Scrolling Up
				if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
					mainNav.classList.add('is-visible');
				} else {
					mainNav.classList.remove('is-visible', 'is-fixed');
				}
			} else {
				// Scrolling Down
				mainNav.classList.remove(['is-visible']);
				if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
					mainNav.classList.add('is-fixed');
				}
			}
			scrollPos = currentTop;
		});
		
	})
	return (
		<nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
		<div className="container px-4 px-lg-5">
			<Link className="navbar-brand" to="/">My Blog</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				Menu
				<i className="fas fa-bars"></i>
			</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
				<ul className="navbar-nav ms-auto py-4 py-lg-0">
					<li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link></li>
					{/*<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>*/}
					<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle mt-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					Post Actions
				</a>
				<ul className="dropdown-menu">
					<li><Link className="dropdown-item" to="/createPost">Create Post</Link></li>
					<li><hr className="dropdown-divider"/></li>
					<li><a className="dropdown-item" href="#">Something else here</a></li>
				</ul>
				</li>
				<li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</Link></li>
					{!token?(
						<> 
						<li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/signup">Sign Up</Link></li>
						<li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Login</Link></li>
						</>
					):
					<li className="nav-item"><LogoutFunction/></li>
				}
					
				</ul>
			</div>
		</div>
	</nav>
	);
};
