import React, { useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";
import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers2.svg";

const AjoutCreation = () => {
	const [name, setName] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [title, setTitle] = useState("");
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};
	const handleImage = (e) => {
		console.log("handleImage");
		console.log(e);
		// console.log('URL.createObjectURL(e)');
		// console.log(URL.createObjectURL(e));
		setImages((images) => [...images, e]);
	};
	const validerAjout = () => {
		console.log("titre " + title);
		console.log("descripttion " + description);
	};
	console.log("images from ajoutcreation");
	console.log(images);
	return (
		<div className={styles.main}>
			<LoginSvg className={styles.svg1} />
			<div className={styles.secondary}>
				<div className={styles.container}>
					<label className={styles.LabelTitle}>Titre</label>
					<input onChange={handleTitle} type="text" value={title} maxLength="25" className={styles.inputTitle} />
					<label className={styles.LabelTitle}>Description</label>
					<textarea onChange={handleDescription} rows={5} value={description} className={styles.inputTitle}  	type="text" maxLength="60" />
					<br />
					<InputImage Recupererfile={handleImage} />
				</div>
				<ListeImages images={images} />
					<button onClick={validerAjout} className={styles.buttonValidation}>valider</button>
			</div>
				<LoginSvg className={styles.svg2} />
		</div>
	);
};

export default AjoutCreation;
