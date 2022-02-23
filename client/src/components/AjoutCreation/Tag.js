import React, { useEffect, useState } from "react";
import styles from "./AjoutCreation.module.css";


const Tag = ({ tags, addTag }) => {
	console.log("tags from TAG")
	console.log(tags)
	return (
			<div className={styles.tags}>
				{tags &&
					tags.map((tag, i) => (
						<div className={styles.tag} key={i} onClick={() => addTag(tags[i])}>
							{tag.tag}
						</div>
					))}
			</div>
	);
};

export default Tag;
