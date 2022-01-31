import React, { useState } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import "../index.css";
import LoginForm from "./LoginForm";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		width: "50VW",
		height: "65VH",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "rgb(250, 250, 250)",
		display: "flex",
		justifyContent: "center",
		padding: "0.3REM",
		boxShadow: "3px 3px 30px 2px"
	},
};

Modal.setAppElement("body");

const Navbar = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isUserConnected, setIsUserConnected] = useState(false);
	const seConnecter = () => {};
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<>
			<nav style={styles.navbar}>
				<ol style={styles.ol}>
					<li>
						<Link to="/" style={styles.text}>
							Accueil
						</Link>
					</li>
					<li>
						<Link to="/Creations" style={styles.text}>
							Mes Créations
						</Link>
					</li>
					<li>
						<Link to="/QuiSuisJe" style={styles.text}>
							Qui suis-je ?
						</Link>
					</li>
					<li>
						<Link to="/Contact" style={styles.text}>
							Contactez-moi
						</Link>
					</li>
					<li>
						<Link to="/Evenements" style={styles.text}>
							Evénements
						</Link>
					</li>
				</ol>
				<div onClick={openModal} style={{ ...styles.text, ...styles.connexionButton }}>
					{isUserConnected ? "Christele Vachon" : <FontAwesomeIcon icon={faUser} />}
				</div>

				<Modal
					isOpen={modalIsOpen}
					// onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<LoginForm closeModal={closeModal} />
				</Modal>
			</nav>
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
		height: "100%",
		margin: "0",
		padding: "0",
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
	connexionButton: {
		position: "absolute",
		right: "4%",
	},
};
