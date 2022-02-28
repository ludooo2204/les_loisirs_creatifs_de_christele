import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import ReactTooltip from "react-tooltip";
import isEmail from "validator/lib/isEmail";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../LoginForm/LoginForm.module.css";

import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers.svg";
import axios from "axios";

const RenouvellerPassword = () => {
	const [MDP1, setMDP1] = useState(null);
	const [MDP2, setMDP2] = useState(null);
	const [passwordShown, setPasswordShown] = useState(false);

	let [searchParams, setSearcheParams] = useSearchParams();
	let navigate = useNavigate();

	let email = searchParams.get("email");
	let token = searchParams.get("token");
	useEffect(() => {
		axios.get("/api/reset-password", { params: { token, email } }).then(console.log("gegette!!!"));
	}, []);
	const handlePassword1 = (e) => {
		setMDP1(e.target.value);
	};
	const handlePassword2 = (e) => {
		setMDP2(e.target.value);
	};
	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};
	const handleSubmit = () => {
		axios.post("/api/reset-password", { email, token, MDP1, MDP2 }).then((result) => {
			console.log("result", result);
			if (result.data.status === "ok") {
				if (window.confirm("le mot de passe a été réinitialisé. Veuillez-vous connecter avec votre nouveau mot de passe")) {
					navigate("../");
				}
			}
			else if (result.data.message==="Passwords do not match. Please try again.") {
				window.confirm("Attention, les 2 mots de passe ne correspondent pas. Veuillez vérifier vos mots de passe")
			}
			else if (result.data.message==="Token not found. Please try the reset password process again.") {
				window.confirm("Veuillez recommencer votre demande, soit le délai est ecoulé soit cette réinitialisation à déja été effectuée")
			}
		});
	};
	return (
		<div className="forgottenPasswordForm">
			{/* <LoginSvg className={styles.LoginSvg1} />
			<LoginSvg className={styles.LoginSvg2} />
			<LoginSvg className={styles.LoginSvg3} />
			<LoginSvg className={styles.LoginSvg4} /> */}
			<div className="labelGroupModal">
				<span>
					<label data-tip data-for="identifiant">
						Saisir votre nouveau mot de passe
					</label>
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />

					{/* <HelpOutlineOutlinedIcon style={{ position: "relative", top: "10" }} sx={{ fontSize: 15 }} /> */}
				</span>
				<input type={passwordShown ? "text" : "password"} onChange={handlePassword1} value={MDP1} />
				<span>
					<label> Saisir votre nouveau mot de passe à nouveau</label>
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
				</span>
				<input type={passwordShown ? "text" : "password"} onChange={handlePassword2} value={MDP2} />
				<button className={styles.buttonValidation} onClick={handleSubmit}>
					valider
				</button>
			</div>
		</div>
	);
};

export default RenouvellerPassword;
