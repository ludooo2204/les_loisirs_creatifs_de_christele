import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
const ListeImages = ({ images,onDelete }) => {
	const [imagesState, setimagesState] = useState(images);
	useEffect(() => {
		setimagesState(images);
	}, [images]);

	// console.log("ListeImages");
	// console.log("ListeImages");
	// console.log("images");
	// console.log(images);
	// console.log("typeof images[0");
	// console.log(typeof images[0]);
	// console.log(images[0]);
	// console.log("imagesState")
	// console.log("imagesState")
	// console.log(imagesState)
	// const onDelete = (i) => {
	// 	console.log(imagesState);
	// 	const copie = [...imagesState];
	// 	copie.splice(i, 1);
	// 	setimagesState(copie);
	// };
	return (
		<div className={styles.ListeImages}>
			{imagesState &&
				imagesState.map((image, i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							{/* {console.log("image ooooooo")}
							{console.log(image)} */}
							{/* CA CA MARCHE POUR LE CHARGMENT VIA LA MODIFICATION */}
							{/* <img className={styles.image} src={require("../../uploads/" + image)} /> */}

							{/* CA CA MARCHE POUR L'UPLOAD */}
							<img className={styles.image} src={typeof image=='string'?require("../../uploads/" + image):URL.createObjectURL(image)} />

							<HighlightOffIcon className={styles.iconeDelete} onClick={() => onDelete(i)} />
						</div>
					);
				})}
		</div>
	);
};

export default ListeImages;
