import React, { useEffect, useRef, useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";
import ListeImages from "./ListeImages";
import ListeImagesModifiées from "./ListeImagesModifiées";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers2.svg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { matchSorter } from "match-sorter";
import Tag from "./Tag";

const AjoutCreation = () => {
	const [title, setTitle] = useState("");
	const [prix, setPrix] = useState("");
	const [tag, setTag] = useState("");
	const [newTag, setNewTag] = useState(0);
	const [tagTrouvés, setTagTrouvés] = useState(null);
	const [tagChoisi, setTagChoisi] = useState(null);
	const [bddTag, setBddTag] = useState(null);

	const [images, setImages] = useState([]);
	// const [dataToModify, setDataToModify] = useState(null);
	const [description, setDescription] = useState("");
	const tagInputRef = useRef();
	const { state } = useLocation();
	// console.log(state)

	useEffect(() => {
		if (state) {
			console.log(state);
			setTitle(state.nom);
			setDescription(state.description);
			setPrix(state.prix);
			setImages(state.url)
			// setTagTrouvés(state.tags)
			// setTagChoisi(state.tags)
		}
	}, []);
	useEffect(() => {
		console.log("fetch tags");
		axios.get("/tag").then((tags) => {
			setBddTag(tags.data);
		});
	}, [newTag]);
	useEffect(() => {
		// console.log("tagInputRef")
		// console.log(tagInputRef.current.value)
		handleTag(tagInputRef.current.value);
	}, [bddTag]);

	let navigate = useNavigate();
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const handleDescription = (e) => {
		setDescription(e.target.value);
	};
	const handlePrix = (e) => {
		const prix = Number(e.target.value);
		if (isNaN(prix)) alert("il faut un nombre");
		else setPrix(e.target.value);
	};

	// const bddTag = ["decoration", "noel", "tamere"];
	const handleTag = (e) => {
		let value;
		e.target == undefined ? (value = e) : (value = e.target.value);
		setTag(value);
		if (value != "") {
			const resultatDeRecherche = matchSorter(
				bddTag.map((tag) => tag.tag),
				value
			);
			console.log("ototototo");
			let temp = [];
			for (const iterator of resultatDeRecherche) {
				temp.push(bddTag.filter((e) => e.tag == iterator)[0]);
			}
			console.log("temp");
			console.log(temp);
			// setTagTrouvés(resultatDeRecherche);
			setTagTrouvés(temp);
		} else setTagTrouvés(null);
	};
	const handleImage = (e) => {
		console.log("images?");
		console.log(e);
		setImages((images) => [...images, e]);
	};
	const handleTagSelectionné = (e) => {
	
		setTagChoisi(e);
	};
	const validerAjout = () => {
		console.log("tagChoisi");
		console.log(tagChoisi);
		console.log(images);
		const nouvelleCreation = { title, description, prix, images: images.map((image) => image.name), tagChoisi: tagChoisi.map((e) => e.id_tag) };
		if (prix == "") {
			alert("il manque un prix !");
		} else if (title == "") {
			alert("il manque un titre !");
		} else if (description == "") {
			alert("il manque une description !");
		} else if (tagChoisi == "") {
			alert("il faut au moins un tag !");
		} else if (images.length == 0) {
			alert("il faut au moins une image !");
		} else {
			console.log(nouvelleCreation);
			if (state) {
				axios.patch('/products/'+state.id,nouvelleCreation)
				.then(navigate("../Creations"))
				// axios.patch("/products/", nouvelleCreation).then(navigate("../Creations"));
			} else axios.post("/products", nouvelleCreation).then(navigate("../Creations"));
		}
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			console.log("do validate");
			axios
				.post("/tag", { tag })
				.then(setNewTag(newTag + 1))
				.catch((err) => console.log(err));
		}
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
					<input onChange={handleTag} onKeyDown={handleKeyDown} ref={tagInputRef} type="text" value={tag} maxLength="25" className={styles.inputTitle} />
					{tagTrouvés && <Tag tags={tagTrouvés} selectionTag={handleTagSelectionné} />}
					<InputImage Recupererfile={handleImage} />
				</div>
				{!state && <ListeImages images={images} />}
				{state && <ListeImagesModifiées images={state.url} />}
				<button onClick={validerAjout} className={styles.buttonValidation}>
					valider
				</button>
			</div>
			<LoginSvg className={styles.svg2} />
		</div>
	);
};

export default AjoutCreation;
