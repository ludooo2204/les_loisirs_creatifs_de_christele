import React, { useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";
import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers2.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AjoutCreation = () => {
	const [title, setTitle] = useState("");
	const [prix, setPrix] = useState("");
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	let navigate = useNavigate();
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};
	const handlePrix = (e) => {
		setPrix(e.target.value);
	};
	const handleImage = (e) => {
		console.log("handleImage");
		console.log(e);
		// console.log('URL.createObjectURL(e)');
		// console.log(URL.createObjectURL(e));
		setImages((images) => [...images, e]);
	};
	const validerAjout = () => {
		// console.log("titre " + title);
		// console.log("descripttion " + description);
		// console.log("prix " + prix);
		console.log("images " + images);
		const nouvelleCreation = { title, description, prix, images: images.map((image) => image.name) };
		console.log(nouvelleCreation);
		axios.post("/addProduct", nouvelleCreation).then(
			navigate('../Creations')
		).then(alert('Nouvelle créations ajoutée !'))
	};
	return (
		<div className={styles.main}>
			<LoginSvg className={styles.svg1} />
			<div className={styles.secondary}>
				<div className={styles.container}>
					<label className={styles.LabelTitle}>Titre</label>
					<input onChange={handleTitle} type="text" value={title} maxLength="25" className={styles.inputTitle} />
					<label className={styles.LabelTitle}>Description</label>
					<textarea onChange={handleDescription} rows={2} value={description} className={styles.inputTitle} type="text" maxLength="60" />
					<label className={styles.LabelTitle}>Prix €</label>
					<span className={styles.euro}>
						<input onChange={handlePrix} type="" value={prix} maxLength="25" className={styles.inputTitle} />€
					</span>
					<br />
					<InputImage Recupererfile={handleImage} />
				</div>
				<ListeImages images={images} />
				<button onClick={validerAjout} className={styles.buttonValidation}>
					valider
				</button>
				<button onClick={()=>navigate('../Creations')} className={styles.buttonValidation}>
					nav
				</button>
			</div>
			<LoginSvg className={styles.svg2} />
		</div>
	);
};

export default AjoutCreation;
