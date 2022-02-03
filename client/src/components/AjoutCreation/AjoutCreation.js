import React, { useState } from "react";
import styles from "./AjoutCreation.module.css";
import ReactTooltip from "react-tooltip";
import InputImage from "./InputImage";

const AjoutCreation = () => {
	const [name, setName] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	return (
		<div className={styles.main}>
			<InputImage />
		</div>
	);
};

export default AjoutCreation;
