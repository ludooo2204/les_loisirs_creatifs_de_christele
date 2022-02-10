import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";

const Tag = ({ tags }) => {
	const [tagsSelectionnés, settagsSelectionnés] = useState([]);
	const [selection, setSelection] = useState([]);
	useEffect(() => {
		setSelection(tags.map((e) => false));
	}, []);
	useEffect(() => {
		console.log(selection);
	}, [selection]);

	const addTag = (index) => {
		settagsSelectionnés((tagsSelectionnés) => [...tagsSelectionnés, tags[index]]);
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
					<div className={selection[i]?styles.tagSelection:styles.tag} key={i} onClick={() => addTag(i)}>
						{tag}
					</div>
				))}
		</div>
	);
};

export default Tag;
