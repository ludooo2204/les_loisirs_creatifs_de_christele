import React, { useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";
import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers2.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { matchSorter } from "match-sorter";
import Tag from "./Tag";

const AjoutCreation = () => {
	const [title, setTitle] = useState("");
	const [prix, setPrix] = useState("");
	const [tag, setTag] = useState("");
	const [tagTrouvés, setTagTrouvés] = useState(null);
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
	
	const bddTag = ["decoration", "noel", "tamere"];
	const handleTag = (e) => {
		setTag(e.target.value);

		if (e.target.value != "") {
			const resultatDeRecherche = matchSorter(bddTag, e.target.value);
			setTagTrouvés(resultatDeRecherche);
		} else setTagTrouvés(null);
	};
	const handleImage = (e) => {
		setImages((images) => [...images, e]);
	};
	const validerAjout = () => {
		const nouvelleCreation = { title, description, prix, images: images.map((image) => image.name) };
		console.log(nouvelleCreation);
		axios.post("/addProduct", nouvelleCreation).then(navigate("../Creations"));
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
					<label className={styles.LabelTitle}>Tags</label>
					<input onChange={handleTag} type="text" value={tag} maxLength="25" className={styles.inputTitle} />
					{/* {tagTrouvés && tagTrouvés.map((e) => <span>{e}</span>)} */}
					{tagTrouvés&&<Tag tags={tagTrouvés} />}
					<InputImage Recupererfile={handleImage} />
				</div>
				<ListeImages images={images} />
				<button onClick={validerAjout} className={styles.buttonValidation}>
					valider
				</button>
			</div>
			<LoginSvg className={styles.svg2} />
		</div>
	);
};

export default AjoutCreation;
