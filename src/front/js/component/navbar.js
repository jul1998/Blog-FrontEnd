import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Navbar = () => {

	window.addEventListener('DOMContentLoaded', () => {
		let scrollPos = 0;
		const mainNav = document.getElementById('mainNav');
		const headerHeight = mainNav.clientHeight;
		window.addEventListener('scroll', function() {
			const currentTop = document.body.getBoundingClientRect().top * -1;
			if ( currentTop < scrollPos) {
				// Scrolling Up
				if (currentTop > 0 && mainNav.classNameList.contains('is-fixed')) {
					mainNav.classNameList.add('is-visible');
				} else {
					console.log(123);
					mainNav.classNameList.remove('is-visible', 'is-fixed');
				}
			} else {
				// Scrolling Down
				mainNav.classNameList.remove(['is-visible']);
				if (currentTop > headerHeight && !mainNav.classNameList.contains('is-fixed')) {
					mainNav.classNameList.add('is-fixed');
				}
			}
			scrollPos = currentTop;
		});
		
	})
	return (
		<nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
		<div className="container px-4 px-lg-5">
			<a className="navbar-brand" href="index.html">My Blog</a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				Menu
				<i className="fas fa-bars"></i>
			</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
				<ul className="navbar-nav ms-auto py-4 py-lg-0">
					<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" ><Link to="/">Home</Link></a></li>
					<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>
					<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Sample Post</a></li>
					<li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contact</a></li>
				</ul>
			</div>
		</div>
	</nav>
	);
};
