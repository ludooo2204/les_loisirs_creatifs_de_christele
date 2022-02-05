import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReactTooltip from "react-tooltip";
import isEmail from "validator/lib/isEmail";

const LoginForm = ({ closeModal, seConnecter }) => {
	const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);

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
	const validerFormFake = () => {
		closeModal();
		seConnecter("ludo");
	};

	return (
		<div className="LoginForm">
			{/* <button className="buttonConnexionDansModal">Se connecter</button> */}
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
				<input type="text" />
				<span>
					<label>Mot de passe</label>
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
				</span>
				<input type={passwordShown ? "text" : "password"} />
				{!isChoixInscriptionActif && (
					<span>
						<label>Confirmation mot de passe</label>
						<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input type={passwordShown ? "text" : "password"} />}
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
				{/* console.log(isEmail('foo@bar.com')); pour verifier si mail ok */}
				{!isChoixInscriptionActif && <input type="email" />}
			</div>
			<span>
				<button className="button--validation" onClick={validerForm}>
					valider
				</button>
				<button style={{ width: "100px", position: "absolute" }} data-testid="devAdmin" onClick={validerFormFake}>
					se connecter pour developpement
				</button>
			</span>
		</div>
	);
};

export default LoginForm;
