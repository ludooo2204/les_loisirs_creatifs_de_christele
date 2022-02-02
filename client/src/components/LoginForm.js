import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import isEmail from 'validator/lib/isEmail';

const LoginForm = ({ closeModal }) => {
	const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};
	const seConnecter = () => {
		setIsChoixInscriptionActif(true);
	};
	const sInscrire = () => {
		setIsChoixInscriptionActif(false);
	};
	const validerForm = () => {
		closeModal()
	};

	return (
		<div className="LoginForm">
			{/* <button className="buttonConnexionDansModal">Se connecter</button> */}
			<div className="buttonLoginGroupDansModal">
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--actif" : "button--calypso--inactif"}`}
					onClick={seConnecter}
				>
					<span>Se connecter</span>
				</button>
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--inactif" : "button--calypso--actif"}`}
					onClick={sInscrire}
				>
					<span>S'inscrire</span>
				</button>
			</div>
			<div className="labelGroupModal">
				<label>Identifiant</label>
				<input type="text" />
				<span>
					<label>Mot de passe</label>
					<VisibilityOutlinedIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "1REM", fontSize: "20", cursor:"pointer" }} />
				</span>
				<input type={passwordShown ? "text" : "password"} />
				{!isChoixInscriptionActif && (
					<span>
						<label>Confirmation mot de passe</label>
						<VisibilityOutlinedIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "1REM", fontSize: "20", cursor:"pointer" }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input type={passwordShown ? "text" : "password"} />}
				{!isChoixInscriptionActif && <label>Email</label>}
			{/* console.log(isEmail('foo@bar.com')); pour verifier si mail ok */}
				{!isChoixInscriptionActif && <input type="email" />}
			</div>


			<button className="button--validation" onClick={validerForm}>
				valider
			</button>
		</div>
	);
};

export default LoginForm;
