import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Header from "../component/header.jsx";
import ShowMainContent from "../Component/Post Comp/mainContent.jsx";
import homeBg from "../../img/home-bg.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);



	return (
		<div>
			<Header imgUrl={homeBg}/>
		<ShowMainContent/>
		</div>
		
	);
};
