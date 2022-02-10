import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const ListeImages = ({ images }) => {
	const [imagesState, setimagesState] = useState(images);
	useEffect(() => {
setimagesState(images)	
	
	}, [images]);
	

	const onDelete =(i)=>{
		console.log(imagesState);
		const copie=[...imagesState]
		copie.splice(i,1);
		setimagesState(copie)
	}
	return (
		<div className={styles.ListeImages}>
			{imagesState &&
				imagesState.map((image,i) => {
					return (
						<div key={i} className={styles.imageGroup}>
							<img className={styles.image} src={URL.createObjectURL(image)} />
           				    <HighlightOffIcon className={styles.iconeDelete} onClick={()=>onDelete(i)}/>
						</div>
					);
				})}
		</div>
	);
};

export default ListeImages;
