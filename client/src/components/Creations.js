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
		axios.get("/products").then((e) => {
			console.log("products fecth");
			console.log(e);
			if (e.data) setBddCréation(e.data);
		});
	}, [refreshProp]);

	const refresh = () => {
		console.log("refresh from creation");
		setRefresh(refreshProp + 1);
	};
	let navigate = useNavigate();
	return (
		<div className={styles.main}>
			{bddCréation && bddCréation.map((e) => <Card isAdmin={isAdmin} data={e} imagess={e.url} refresh={refresh} />)}

			<ReactTooltip className="" globalEventOff="click" place="bottom" type="light" effect="float" id="add">
				<h3>Ajouter une création</h3>
				<p>Clique ici pour ajouter une de tes nouvelles créations</p>
			</ReactTooltip>
			{isAdmin && <AddCircleIcon data-tip data-for="add" onClick={() => navigate("../ajoutCreation")} className={styles.addCreation} />}
		</div>
	);
};

export default Creations;
