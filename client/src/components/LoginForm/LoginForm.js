import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReactTooltip from "react-tooltip";
import isEmail from "validator/lib/isEmail";
import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers.svg";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { addCount, resetCount, setUser } from "../../redux/action";

const LoginForm = ({ closeModal }) => {
	const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);
	const [MDP, setMDP] = useState("");
	const [MDP2, setMDP2] = useState("");
	const [identifiant, setIdentifiant] = useState("");
	const [email, setEmail] = useState("");
	const [emailForNewPassword, setEmailForNewPassword] = useState(null);
	const [emailForLogin, setEmailForLogin] = useState(null);
	const [emailVisibleforNewPassword, setEmailVisibleforNewPassword] = useState(false);
	const [emailVisibleforLogin, setEmailVisibleforLogin] = useState(false);


	const user = useSelector((state) => state.user);

	const dispatch = useDispatch()

	const seConnecter = (user) => {
		console.log(user.username);
		console.log("user");
		console.log(user);
		dispatch(setUser(user));

		// setUserConnected(user.username);
	};


	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};
	const seConnecterViaButton = () => {
		setIsChoixInscriptionActif(true);
	};
	const sInscrireViaButton = () => {
		setIsChoixInscriptionActif(false);
	};
	const validerForm = () => {
		closeModal();
	};
	const validerInscription = () => {
		if (MDP === MDP2) {
			axios
				.post("/api/auth/signup",
					{ username: identifiant, email, password: MDP, roles: ["user"] })
				.then((e) => {
					if (e.data.message == "Erreur! l'identifiant est déja utilisé!") {
						window.alert(e.data.message);
						return;
					}
					if (e.data.message == "Erreur! l'email est déja utilisé!") {
						window.alert(e.data.message);
						return;
					}
					window.alert("Inscription Réussie");
					closeModal();
				})
				.catch((err) => console.log(err));
		} else window.alert("les mdp se sont pas les mêmes !");
	};
	const validerConnexion = () => {
		axios
			.post("/api/auth/signin", { username: identifiant, password: MDP })
			.then((e) => {
				if (e.data.message == "Cet identifiant n'existe pas !") {
					window.alert(e.data.message);
					return;
				}
				if (e.data.message == "Mot de passe erroné!") {
					window.alert(e.data.message);
					return;
				}
				console.log("retour de la connection");
				console.log(e.data);
				window.localStorage.setItem("token", e.data.accessToken);

				seConnecter({ userId: e.data.id, username: e.data.username, roles: e.data.roles });

				closeModal();
			})
			.catch((err) => console.log(err));
		// seConnecter("ludo");
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleId = (e) => {
		setIdentifiant(e.target.value);
	};
	const handleMDP = (e) => {
		setMDP(e.target.value);
	};
	const handleMDP2 = (e) => {
		setMDP2(e.target.value);
	};
	const retrievePassword = () => {
		setEmailVisibleforNewPassword(true);
		setEmailVisibleforLogin(false);
	};
	const retrieveLogin = () => {
		setEmailVisibleforNewPassword(false);
		setEmailVisibleforLogin(true);
	};
	const handleEmailForNewPasswordInput = (e) => {
		setEmailForNewPassword(e.target.value);
	};
	const handleEmailForLoginInput = (e) => {
		setEmailForLogin(e.target.value);
	};

	const handleSendmailForPassword = () => {
		if (emailForNewPassword) {

			axios
				.post("/api/forgot-password", { email: emailForNewPassword })
				.then((e) => {
					window.alert("Un mail de réinitialisation a été envoyé à " + emailForNewPassword +
						" .\n\n merci de consulter vos mails");
				})
				.catch((err) => console.log("bye", err));
		} else {
			window.alert("veuillez entrer votre email !");
		}
	};
	const handleSendmailForLogin = () => {
		if (emailForLogin) {
			console.log("clickSendMail for login");
			axios
				.post("/api/forgot-login", { email: emailForLogin })
				// .get("/api/sendmail")
				.then((e) => {
					console.log("ca marche !", e);
					window.alert("Un mail contenant votre login a été envoyé à " + emailForLogin + " .\n\n merci de consulter vos mails");
				})
				.catch((err) => console.log("bye", err));
		} else {
			window.alert("veuillez entrer votre email !");
		}
	};
	return (
		<div className="LoginForm">
			<div className="buttonLoginGroupDansModal">
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--actif" : "button--calypso--inactif"}`}
					onClick={seConnecterViaButton}
				>
					<span>Se connecter</span>
				</button>
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--inactif" : "button--calypso--actif"}`}
					onClick={sInscrireViaButton}
				>
					<span>S'inscrire</span>
				</button>
			</div>
			<LoginSvg className={styles.LoginSvg1} />
			<LoginSvg className={styles.LoginSvg2} />
			<LoginSvg className={styles.LoginSvg3} />
			<LoginSvg className={styles.LoginSvg4} />
			<div className="labelGroupModal">
				<span>
					<label data-tip data-for="identifiant">
						Identifiant
					</label>
					<ReactTooltip className="tooltip" globalEventOff="click" place="bottom" type="light" effect="float" id="identifiant">
						<h3>Identifiant</h3>
						<p>Cet identifiant peut-être votre nom ou un pseudo si vous souhaitez rester anonyme</p>
					</ReactTooltip>
					<HelpOutlineOutlinedIcon style={{ position: "relative", top: "10" }} sx={{ fontSize: 15 }} />
				</span>
				<input type="text" onChange={handleId} value={identifiant} />
				<span>
					<label>Mot de passe</label>
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
				</span>

				<input type={passwordShown ? "text" : "password"} onChange={handleMDP} value={MDP} />

				<span style={{ margin: "auto" }}>
					{isChoixInscriptionActif && (
						<button className={styles.buttonMotDePasseOublié} onClick={retrievePassword}>
							{" "}
							mot de passe oublié ?
						</button>
					)}
					{isChoixInscriptionActif && (
						<button className={styles.buttonMotDePasseOublié} onClick={retrieveLogin}>
							{" "}
							Identifiant oublié ?
						</button>
					)}
				</span>
				{isChoixInscriptionActif && emailVisibleforNewPassword && (
					<>
						<label>Email pour renouveller le mot de passe</label>
						<input onChange={handleEmailForNewPasswordInput} value={emailForNewPassword} type="text" />
						<button className={styles.buttonMotDePasseOublié} onClick={handleSendmailForPassword}>
							Valider
						</button>
					</>
				)}
				{isChoixInscriptionActif && emailVisibleforLogin && (
					<>
						<label>Email pour récupérer login</label>
						<input onChange={handleEmailForLoginInput} value={emailForLogin} type="text" />
						<button className={styles.buttonMotDePasseOublié} onClick={handleSendmailForLogin}>
							Valider
						</button>
					</>
				)}
				{!isChoixInscriptionActif && (
					<span>
						<label>Confirmation mot de passe</label>
						<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input type={passwordShown ? "text" : "password"} onChange={handleMDP2} value={MDP2} />}
				{!isChoixInscriptionActif && (
					<span>
						<label data-tip data-for="mail">
							Email
						</label>{" "}
						<ReactTooltip className="tooltip" globalEventOff="click" place="bottom" type="light" effect="float" id="mail">
							<h3>E-mail</h3>
							<p>Cet e-mail set à récupérer votre mot de passe en cas d'oubli</p>
						</ReactTooltip>
						<HelpOutlineOutlinedIcon style={{ position: "relative", top: "10" }} sx={{ fontSize: 15 }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input type="email" onChange={handleEmail} value={email} />}
			</div>
			<button className={styles.buttonValidation} onClick={!isChoixInscriptionActif ? validerInscription : validerConnexion}>
				valider
			</button>
		</div>
	);
};

export default LoginForm;
