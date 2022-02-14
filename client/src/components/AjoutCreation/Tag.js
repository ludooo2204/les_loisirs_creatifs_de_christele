import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";




///revoir le systeme de tag. Une fois selectionné, il faut les mettre dans une div a gauche par exemple.








const Tag = ({ tags, selectionTag }) => {
	const [tagsSelectionnés, settagsSelectionnés] = useState([]);
	const [tagAModifier, setTagAModifier] = useState(null);
	const [selection, setSelection] = useState([]);

	useEffect(() => {
		if (tags[0].modifié) setTagAModifier(tags);
		// else setSelection(tags.map((e) => true));
		setSelection(tags.map((e) => false));
	}, []);
	useEffect(() => {
		selectionTag(tagsSelectionnés);
	}, [selection, tagAModifier]);
	useEffect(() => {}, [tagsSelectionnés]);

	const addTag = (index) => {
		settagsSelectionnés((tagsSelectionnés) => [...tagsSelectionnés, tags[index]]);
		if (tagAModifier) {
			setTagAModifier((tagAModifier) => [...tagAModifier, tags[index]]);
		}

		if (selection) {
			const temp = selection.map((e, i) => {
				return i == index ? !selection[i] : selection[i];
			});
			setSelection(temp);
		}
	};
	return (
		<div className={styles.tags}>
			{tags &&
				tags.map((tag, i) => (
					<div className={selection[i] ? styles.tagSelection : styles.tag} key={i} onClick={() => addTag(i)}>
						{tag.tag}
					</div>
				))}
		</div>
	);
};

export default Tag;
