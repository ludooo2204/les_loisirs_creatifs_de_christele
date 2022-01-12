import React from "react";

import { Routes, Route,Outlet,Link } from "react-router-dom";

import "../index.css";
const liens = ["Mes Créations", "Qui suis-je ?", "Contactez-moi","Evénements"];
const routes = ["/Creations", "/QuiSuisJe", "/Contact","/Evenements"];

const Navbar = () => {
	return (
		<>
		<nav style={styles.navbar}>
			<ol style={styles.ol}>
				<li>
					<Link to="/" style={styles.text}>Accueil</Link>
				</li>
				<li>
					<Link to="/Creations" style={styles.text}>Mes Créations</Link>
				</li>
				<li>
					<Link to="/QuiSuisJe" style={styles.text}>Qui suis-je ?</Link>
				</li>
				<li>
					<Link to="/Contact" style={styles.text}>Contactez-moi</Link>
				</li>
				<li>
					<Link to="/Evenements" style={styles.text}>Evénements</Link>
				</li>
				
				
			</ol>
		</nav>
		<Outlet />
		</>

	);
};

export default Navbar;

const styles = {
	navbar: {
		backgroundColor: "#F0C8A3",
		height: "5VH",
		minHeight: "5VH",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	ol: {
		display: "flex",
		width: "50%",
		height: '100%',
		margin: '0',
		padding: '0',
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		listStyleType: "none",
	},
	text: {
		color: "#684529",
		fontFamily: "Pacifico",
		textDecoration: "none",
		fontSize: "1.2VW",
		
	},
};
