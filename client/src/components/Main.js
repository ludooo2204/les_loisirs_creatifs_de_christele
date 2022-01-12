import React, {useRef,useEffect} from "react";
import styles from "./Main.module.css";
import { gsap } from "gsap";
import ciseau1 from'../image/ciseau1.png'
import ciseau2 from'../image/ciseau2.png'
import bobineFil from'../image/bobine.png'

const Main = () => {
	
	const fleurLeftRef = useRef();
	const fleurRightRef = useRef();
	const titleRef = useRef();
	const ciseau1Ref = useRef();
	const ciseau2Ref = useRef();
	const ciseauRef = useRef();
	const bobineRef = useRef();
	useEffect(() => {
		gsap.from(fleurLeftRef.current, { translateX: "-=360",duration:2	 });
		gsap.from(fleurRightRef.current, { translateX: "+=360",duration:2	 });
		gsap.from(titleRef.current, { opacity: 0,duration:4	 });
		gsap.from(ciseau1Ref.current, { rotation: "+=27",duration:0.4,repeat:-1, yoyo:true	 });
		gsap.from(ciseau2Ref.current, { rotation: "-=27",duration:0.4,repeat:-1, yoyo:true	 });
		gsap.from(ciseauRef.current, {opacity:0,duration:40,repeat:-1, 	 });
		// gsap.to(ciseauRef.current, { translateY: "-=80VH",translateX: "-=80VW",duration:90,repeat:-1 });
		// gsap.to(ciseau2Ref.current, { translateY: "-500",duration:5,repeat:-1	 });
	});

	return (
		// <div className={styles.tout}>
		<main className={styles.main}>
			<div ref={fleurLeftRef} className={styles.fleurLeftcontainer}>
				<div className={styles.fleurLeft}></div>
			</div>
			<div ref={titleRef}  className={styles.titre}>

			{/* <div ref={ciseauRef} className={styles.ciseaux}>
				<img ref={ciseau1Ref} className={styles.ciseau1} src={ciseau1} />
				<img ref={ciseau2Ref} className={styles.ciseau2} src={ciseau2} />
				</div> */}
			</div> 
			<div ref={fleurRightRef} className={styles.fleurRightcontainer}>
				<div className={styles.fleurRight}></div>
			</div>
		</main>
		// </div>
	);
};

export default Main;
// const styles = {
// 	main: {
// background: 'url(./image/1.jpg) no-repeat 100%',
// height: 1000,

// 	},

// };
