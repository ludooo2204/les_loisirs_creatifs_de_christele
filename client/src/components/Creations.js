import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "./Card/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
const Creations = ({ isAdmin }) => {
	const [bddCréation, setBddCréation] = useState(null);
	const [refreshProp, setRefresh] = React.useState(0);

	useEffect(() => {
		axios.get("/api/creations").then((e) => {
			console.log("products fecth");
			console.log("products fecth");
			console.log("products fecth");
			console.log(e);
			const temp = [...e.data];
			for (const iterator of temp) {
				iterator.url = iterator.images.map((e) => e.url);
				delete iterator.images;
			}

			console.log("temp");
			console.log(temp);
			if (e.data) setBddCréation(temp);
		});
	}, [refreshProp]);

	const refresh = () => {
		console.log("refresh from creation");
		setRefresh(refreshProp + 1);
	};
	let navigate = useNavigate();
	return (
		<div className={styles.main}>
			{bddCréation && bddCréation.map((e) => <Card isAdmin={isAdmin} data={e} refresh={refresh} />)}

			<ReactTooltip className="" globalEventOff="click" place="bottom" type="light" effect="float" id="add">
				<h3>Ajouter une création</h3>
				<p>Clique ici pour ajouter une de tes nouvelles créations</p>
			</ReactTooltip>
			{isAdmin && <AddCircleIcon data-tip data-for="add" onClick={() => navigate("../ajoutCreation")} className={styles.addCreation} />}
		</div>
	);
};

export default Creations;
