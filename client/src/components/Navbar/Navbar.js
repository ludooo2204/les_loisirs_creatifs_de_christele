import React, { useEffect, useRef, useState } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import styles from "./Navbar.module.css";
import LoginForm from "../LoginForm/LoginForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { addCount, resetCount, setUser } from "../../redux/action";



Modal.setAppElement("body");

const Navbar = ({ defaultIsOpen }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	// const [adminConnected, setAdminConnected] = useState(false);
	const [userConnected, setUserConnected] = useState(null);
	// const [userConnected, setUserConnected] = useState(null);

	const store = useSelector((state) => state);
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch()

	console.log("store")
	console.log(store)
	useEffect(() => {
		if (defaultIsOpen) setIsOpen(true);
	}, []);
	useEffect(() => {
		console.log("allez c parti");
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		axios
			.get("/api/signinAuto", header)
			// .get("/api/sendmail")
			.then((e) => {
				console.log("signinauto");
				console.log(e.data);
				setUserConnected(e.data.username);
				console.log("signinauto avec redux");
				dispatch(setUser(e.data));


			})
			.catch((err) => console.log("bye", err));
	}, []);


	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<nav className={styles.navbar}>
				<div className={`${styles.text}  ${styles.socialButton}`}>
					<FacebookIcon />
					<TwitterIcon />
				</div>
				<ol className={styles.ol}>
					<li>
						<Link to="/" className={styles.text}>
							Accueil
						</Link>
					</li>
					<li>
						<Link to="/Creations" className={styles.text}>
							Mes Créations
						</Link>
					</li>
					<li>
						<Link to="/QuiSuisJe" className={styles.text}>
							Qui suis-je ?
						</Link>
					</li>
					<li>
						<Link to="/Contact" className={styles.text}>
							Contactez-moi
						</Link>
					</li>
					<li>
						<Link to="/Evenements" className={styles.text}>
							Evénements
						</Link>
					</li>
				</ol>

				<ReactTooltip className={styles.tooltip} globalEventOff="click" place="bottom" type="light" effect="float" id="AccountCircleIcon">
					<h1>Connectez-vous</h1>
					<p>pour pourvoir me poser des questions, commenter mes créations ou recevoir des alertes par mail quand je rajoute de nouveaux produits !</p>
				</ReactTooltip>
				<div data-testid="connexion" onClick={openModal} className={`${styles.text}  ${styles.connexionButton}`}>
					{userConnected ? (userConnected) : (
						<>
							<AccountCircleIcon
								data-tip
								data-for="AccountCircleIcon"
							/>
							<HelpOutlineOutlinedIcon style={{ alignSelf: "flex-end", position: "relative", right: "10" }} sx={{ fontSize: 15 }} />
						</>
					)}
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

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		width: "50VW",
		height: "80VH",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#f0c8a3",
		display: "flex",
		justifyContent: "center",
		padding: "0.3REM",
		boxShadow: "3px 3px 30px 2px",
		borderRadius: "10px",
	},
};