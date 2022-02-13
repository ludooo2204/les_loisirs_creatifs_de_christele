import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "./Card/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
const Creations = ({ isAdmin }) => {
	const [bddCréation, setBddCréation] = useState(null);
	useEffect(() => {
		axios.get("/products").then((e) => {
			console.log(e);
			setBddCréation(e.data);
		});
	}, []);
	useEffect(() => {
		if (bddCréation) {
			console.log(bddCréation)
			const imagess = require("../uploads/" + bddCréation[0].url[0]);
			console.log(imagess)
		}
	}, [bddCréation]);

	let navigate = useNavigate();
	return (
		<div className={styles.main}>
			{/* {console.log(require("../uploads/"+bddCréation[0].url))} */}
			{/* //ca ca marche !! */}
			{/* {bddCréation&&<img src={require("../uploads/"+bddCréation[0].url)} width={100} height={100}	/>} */}
			{/* <Card isAdmin={isAdmin} /> */}
			{bddCréation && bddCréation.map((e) => <Card isAdmin={isAdmin} data={e} imagess={e.url}/>)}
			{/* <Card isAdmin={isAdmin} />
			<Card isAdmin={isAdmin} />
			<Card isAdmin={isAdmin} />
			<Card isAdmin={isAdmin} /> */}
			<ReactTooltip className="" globalEventOff="click" place="bottom" type="light" effect="float" id="add">
				<h3>Ajouter une création</h3>
				<p>Clique ici pour ajouter une de tes nouvelles créations</p>
			</ReactTooltip>
			{isAdmin && <AddCircleIcon data-tip data-for="add" onClick={() => navigate("../ajoutCreation")} className={styles.addCreation} />}
		</div>
	);
};

export default Creations;
