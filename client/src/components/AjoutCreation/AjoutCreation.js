import React, { useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";

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
		console.log("e");
		console.log(e);
		setImages((images) => [...images, e]);
	};
	const validerAjout = () => {
		console.log("titre " + title);
		console.log("descripttion " + description);
	};
	console.log("images");
	console.log(images);
	return (
		<div className={styles.main}>
			<h1>REVOIR L'UPLOAD DE FICHIER MULTIPLE</h1>
			<ListeImages images={images}/>
			<InputImage Recupererfile={handleImage} />
			<label>Titre</label>
			<input onChange={handleTitle} type="text" value={title} maxLength="11" />
			<label>Description</label>
			<textarea onChange={handleDescription} value={description} type="text" maxLength="20" />
			<button onClick={validerAjout}>valider</button>
		</div>
	);
};

export default AjoutCreation;
