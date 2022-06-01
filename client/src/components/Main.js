import React, { useRef, useEffect } from "react";
import styles from "./Main.module.css";
import { gsap } from "gsap";

const Main = () => {
	const fleurLeftRef = useRef();
	const fleurRightRef = useRef();
	const titleRef = useRef();

	useEffect(() => {
		gsap.from(fleurLeftRef.current, { translateX: "-=360", duration: 2 });
		gsap.from(fleurRightRef.current, { translateX: "+=360", duration: 2 });
		gsap.from(titleRef.current, { opacity: 0, duration: 4 });
	}, []);
	return (
		<main className={styles.main}>
			<div ref={fleurLeftRef} className={styles.fleurLeftcontainer}>
				<div className={styles.fleurLeft}></div>
			</div>
			<div ref={titleRef} className={styles.titre}></div>
			<div ref={fleurRightRef} className={styles.fleurRightcontainer}>
				<div className={styles.fleurRight}></div>
			</div>
		</main>
	);
};

export default Main;
