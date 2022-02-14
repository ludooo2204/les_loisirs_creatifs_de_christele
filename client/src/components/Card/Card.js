import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import styles from "./Card.module.css";
import image1 from "../../image/1.jpg";
import image2 from "../../image/2.jpg";
import image3 from "../../image/blog3.jpg";
import DeleteAndModifyByAdmin from "./DeleteAndModifyByAdmin/DeleteAndModifyByAdmin";
import image4 from "../../image/4.jpg";
import { Navigate } from "react-router-dom";
let images = [image1, image2, image3];

// Modal.setAppElement("#root");

// TO detect if mobile or not
console.log("window.innerWidth");
console.log(window.innerWidth);

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#fefff7",
	},
};

const Card = ({ isAdmin, data,refresh }) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const toggleModalImage = () => {
		setIsOpen(true);
	};
	let navigate = useNavigate();

	const modifierCreation=()=>{
		console.log(data)
		navigate("../../ajoutCreation",{state:data})
	}
	// console.log(require("../../uploads/" + data.url[0]));

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
		swipe: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	console.log(data);
	const settingsModal = {
		customPaging: function (i) {
			return (
				<a>
					<img src={images[i]} className={styles.thumbnail} />
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
				<button className={styles.closeButton} onClick={() => setIsOpen(false)}>
					X
				</button>
				<div className={styles.cardContainerModal}>
			
					<Slider {...settingsModal}>
						<div className={styles.divCardContainerModal}>
							<img src={require("../../uploads/" + data.url[0])} onClick={() => toggleModalImage()} className={styles.cardImageModal} />
						</div>
						<div className={styles.divCardContainerModal}>
							<img src={require("../../uploads/" + data.url[1])} className={styles.cardImageModal} />
						</div>
						<div className={styles.divCardContainerModal}>
							<img src={image2} className={styles.cardImageModal} />
						</div>
					</Slider>
				</div>
			</Modal>
			<div className={styles.divCardContainer}>
					<img src={require("../../uploads/" + data.url[0])} onClick={() => toggleModalImage()} className={styles.cardImage} />
				</div>
			{/* <Slider {...settings}>
				<div className={styles.divCardContainer}>
					<img src={require("../../uploads/" + data.url[0])} onClick={() => toggleModalImage()} className={styles.cardImage} />
				</div>
				<div className={styles.divCardContainer}>
					<img src={require("../../uploads/" + data.url[1])} className={styles.cardImage} />
				</div>
				<div className={styles.divCardContainer}>
					<img src={image2} className={styles.cardImage} />
				</div>
			</Slider> */}
			<div className={styles.legende}>
				<div className={styles.priceTag}>{data.prix}€</div>
				<div className={styles.title}>{data.nom}</div>
				<div className={styles.description}> {data.description}</div>
				{isAdmin && <DeleteAndModifyByAdmin id={data.id} refresh={refresh} modifierCreation={modifierCreation}/>}
			</div>
		</div>
	);
};

export default Card;
