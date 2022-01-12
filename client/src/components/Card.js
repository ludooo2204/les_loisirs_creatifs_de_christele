import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import styles from "./Main.module.css";
import image1 from "../image/1.jpg";
import image2 from "../image/2.jpg";
import image3 from "../image/blog3.jpg";
import image4 from "../image/4.jpg";
let images = [image1, image2, image3];

Modal.setAppElement("#root");

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: '#fefff7',

	},
};

const Card = () => {
	const [modalIsOpen, setIsOpen] = React.useState(false);

	const toggleModalImage = () => {
		setIsOpen(true);
	};
	const settings = {
		// customPaging: function(i) {
		// 	return (
		// 	  <a>
		// 		<img src={images[i]} className={styles.thumbnail}/>
		// 	  </a>
		// 	);
		//   },
		dots: true,
		dotsClass: "slick-dots ",
		swipe:false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	const settingsModal = {
		customPaging: function(i) {
			return (
			  <a>
				<img src={images[i]} className={styles.thumbnail}/>
			  </a>
			);
		  },
		dots: true,
	
		dotsClass: "slick-dots slick-thumb",
		// swipe:false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<div className={styles.cardContainer}>
			{/* <img src={image1} /> */}
			<Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel="Example Modal">
				<button className={styles.closeButton} onClick={()=>setIsOpen(false)}>X</button>
				<div className={styles.cardContainerModal}>
					<Slider {...settingsModal}>
						<div className={styles.divCardContainerModal}>
							<img src={image1} onClick={() => toggleModalImage()} className={styles.cardImageModal} />
						</div>
						<div className={styles.divCardContainerModal}>
							<img src={image3} className={styles.cardImageModal} />
						</div>
						<div className={styles.divCardContainerModal}>
							<img src={image2} className={styles.cardImageModal} />
						</div>
					</Slider>
				</div>
			</Modal>
			<Slider {...settings}>
				<div className={styles.divCardContainer}>
					<img src={image1} onClick={() => toggleModalImage()} className={styles.cardImage} />
				</div>
				<div className={styles.divCardContainer}>
					<img src={image3} className={styles.cardImage} />
				</div>
				<div className={styles.divCardContainer}>
					<img src={image2} className={styles.cardImage} />
				</div>
			</Slider>
			<div className={styles.legende}>
				<div className={styles.priceTag}>35€</div>
				<h3 className={styles.title}>Boite à thé</h3>
				<p> magnifique boite à thés avec 16 compartiments. Piece unique !</p>
			</div>
		</div>
	);
};

export default Card;
