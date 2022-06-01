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
	const [tagChoisi, setTagChoisi] = useState([]);
	const [bddTag, setBddTag] = useState(null);
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	const [refresh, setRefresh] = useState(0);
	const tagInputRef = useRef();
	const { state } = useLocation();
	console.log(description);
	console.log(description.length);
	useEffect(() => {
		if (state) {
			console.log("state");
			console.log("state");
			console.log("state");
			console.log("state");
			console.log(state);

			setTitle(state.nom);
			setDescription(state.description);
			setPrix(state.prix);
			setImages(state.url);
			// setTagTrouvés(state.tags);
			console.log("state");
			console.log(state.tags);
			// console.log(state.tags.map((e) => e.tag));
			setTagChoisi(state.tags);
		}
	}, [state]);

	useEffect(() => {
		// console.log("fetch tags");
		axios.get("/api/tags").then((tags) => {
			console.log("tags.data");
			console.log(tags.data);
			setBddTag(tags.data);
		});
	}, [newTag]);

	useEffect(() => {
		if (!state) handleTag(tagInputRef.current.value);
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

	const handleTag = (e) => {
		console.log("bbddtag");
		console.log(bddTag);
		let value;
		e.target == undefined ? (value = e) : (value = e.target.value);
		setTag(value);
		if (value != "") {
			const resultatDeRecherche = matchSorter(
				bddTag.map((tag) => tag.tag),
				value
			);
			let temp = [];
			for (const iterator of resultatDeRecherche) {
				temp.push(bddTag.filter((e) => e.tag == iterator)[0]);
			}
			console.log("temp");
			console.log(temp);
			setTagTrouvés(temp);
		} else setTagTrouvés(null);
	};
	const handleImage = (e) => {
		setImages((images) => [...images, e]);
	};
	const handleTagSelectionné = (e) => {
		// IL FAUT RAJOUTER CES SELECTIONS DANS UN ARRAY
		console.log("tag from selection");
		console.log(e);

		setTagChoisi((tagChoisi) => [...tagChoisi, e]);
	};
	const validerAjout = () => {
		console.log("images from valider");
		console.log(images);
		const nouvelleCreation = { title, description, prix, images: images.map((image) => (image.name ? image.name : image)), tagChoisi };
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
				console.log("maj de la creation");
				console.log("maj de la creation");
				console.log("maj de la creation");
				axios.patch("/api/creations/" + state.id_creation, nouvelleCreation).then(navigate("../Creations"));
			} else {
				console.log("nouvelle creation");
				console.log("nouvelle creation");
				console.log("nouvelle creation");
				axios.post("/api/creations", nouvelleCreation).then(navigate("../Creations"));
			}
		}
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			axios
				.post("/api/tags", { tag })
				.then(setNewTag(newTag + 1))
				.catch((err) => console.log(err));
		}
	};
	const supprimerTagChoisi = (index) => {
		console.log(tagChoisi);
		console.log(index);
		console.log(tagChoisi[index]);
		tagChoisi.splice(index, 1);
		console.log(tagChoisi);
		setRefresh((refresh) => refresh + 1);
		setTagChoisi(tagChoisi);
	};
	const onDelete = (img) => {
		console.log(images);
		const copie = [...images];
		copie.splice(img, 1);
		setImages(copie);
	};
	return (
		<div className={styles.main}>
			<LoginSvg className={styles.svg1} />
			<div className={styles.secondary}>
				<div className={styles.container}>
					<label className={styles.LabelTitle}>Titre</label>
					<input onChange={handleTitle} type="text" value={title} maxLength="25" className={styles.inputTitle} />
					<label className={styles.LabelTitle}>Description</label>
					<textarea onChange={handleDescription} rows={2} value={description} className={styles.inputTitle} type="text" maxLength="80" />
					<label className={styles.LabelTitle}>Prix €</label>
					<span className={styles.euro}>
						<input onChange={handlePrix} type="" value={prix} maxLength="25" className={styles.inputTitle} />€
					</span>
					<label className={styles.LabelTitle}>Tags</label>
					<input onChange={handleTag} onKeyDown={handleKeyDown} ref={tagInputRef} type="text" value={tag} maxLength="25" className={styles.inputTitle} />
					{tagTrouvés && <Tag tags={tagTrouvés} addTag={handleTagSelectionné} />}
					<InputImage Recupererfile={handleImage} />
				</div>
				{/* {!state && */}
				<ListeImages images={images} onDelete={onDelete} />

				{tagChoisi && (
					<div className={styles.tagChoisiContainer}>
						{tagChoisi.map((e, i) => (
							<div onClick={() => supprimerTagChoisi(i)} key={i} className={styles.tagChoisi}>
								{e.tag}
							</div>
						))}
					</div>
				)}
				<button onClick={validerAjout} className={styles.buttonValidation}>
					valider
				</button>
			</div>
			<LoginSvg className={styles.svg2} />
		</div>
	);
};

export default AjoutCreation;
