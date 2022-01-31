import React,{useState} from "react";

const LoginForm = ({ closeModal }) => {
  const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const toggleConnectInscription = () => {
    setIsChoixInscriptionActif(!isChoixInscriptionActif)
  };
	return (
		<div className="LoginForm">
			{/* <button className="buttonConnexionDansModal">Se connecter</button> */}
			<div className="buttonLoginGroupDansModal">
				<button className={`button button--calypso ${isChoixInscriptionActif ? "button--calypso--actif" : "button--calypso--inactif"}`} onClick={toggleConnectInscription}>
					<span >Se connecter</span>
				</button>
				<button className={`button button--calypso ${isChoixInscriptionActif ? "button--calypso--inactif" : "button--calypso--actif"}`} onClick={toggleConnectInscription}>
					<span>S'inscrire</span>
				</button>
			</div>
			<div className="labelGroupModal"><label>
				Identifiant
			</label>
				<input type="text" />
			<label>
				Mot de passe
			</label>
				<input type="password" />

			<label>
				Email
			</label>
				<input type="email" />
      </div>
			<button onClick={closeModal}>close</button>
		</div>
	);
};

export default LoginForm;
