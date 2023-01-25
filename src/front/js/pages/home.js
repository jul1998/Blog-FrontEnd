import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Header from "../component/header.jsx";
import ShowMainContent from "../component/Post Comp/homeComp.jsx";
import homeBg from "../../img/home-bg1.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);



	return (
		<div>
			<Header imgUrl={homeBg}/>
			<ShowMainContent/>
		</div>
		
	);
};
