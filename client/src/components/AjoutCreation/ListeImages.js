import React from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const ListeImages = ({ images }) => {
	if (images.length > 0) {
		console.log("images from ListeImages");
		console.log(images);
		console.log("URL.createObjectURL(selectedFile)");
		console.log(URL.createObjectURL(images[0]));
	}
	return (
		<div className={styles.ListeImages}>
			{images &&
				images.map((image) => {
					return (
						<div className={styles.imageGroup}>
							<img className={styles.image} src={URL.createObjectURL(image)} />
              <HighlightOffIcon className={styles.iconeDelete}/>
						</div>
					);
				})}
		</div>
	);
};

export default ListeImages;
