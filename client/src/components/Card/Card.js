import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import styles from "./Card.module.css";
import image1 from "../../image/1.jpg";
import image2 from "../../image/2.jpg";
import image3 from "../../image/blog3.jpg";
import DeleteAndModifyByAdmin from "./DeleteAndModifyByAdmin/DeleteAndModifyByAdmin";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Expo, gsap } from "gsap";
import { CommentSection } from "../CommentSection";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Back } from "gsap/all";
import axios from "axios";
import { useSelector } from "react-redux";

let images = [image1, image2, image3];

// Modal.setAppElement("#root");

// TO detect if mobile or not
console.log("window.innerWidth");
console.log(window.innerWidth);


const Card = ({ data, refresh, likee }) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalCommentsOpen, setModalCommentsOpen] = useState(false);
	const [liked, setLiked] = useState(false);
	const [nbrLike, setNbrLike] = useState(0);
	const [nbrComments, setNbrComments] = useState(0);
	// const [refreshProp, setRefresh] = useState(0);

	const [comment, setComment] = useState(null);

	const user = useSelector((state) => state.user);



	const signinUrl = "/signin";
	const signupUrl = "/signup";
	let count = 0;
	if (comment)
		comment.map((i) => {
			count += 1;
			i.replies && i.replies.map((i) => (count += 1));
		});

	useEffect(() => {
		if (likee) setLiked(true);
		console.log("mount CARD !!!!!");
		console.log(data);

		axios.get("/api/comments/" + data.id_creation).then((result) => {
			console.log("comments", result);
			let nbrReply = 0;
			for (const iterator of result.data.comments) {
				nbrReply += iterator.replies.length;
			}
			setComment(result.data.comments);
			setNbrComments(result.data.comments.length + nbrReply);
		});

		// let nbrReply = 0;
		// for (const iterator of data.comments) {
		// 	nbrReply += iterator.replies.length;
		// }
		// setComment(data.comments);
		// setNbrComments(data.comments.length + nbrReply);
	}, []);
	useEffect(() => {
		axios.get("/api/likes/" + data.id_creation).then((result) => setNbrLike(result.data.length));
	}, [liked]);
	const toggleModalImage = () => {
		setIsOpen(true);
	};
	useEffect(() => {
		console.log("useeffect modal comment");
		// refresh()
	}, [modalCommentsOpen]);
	const toggleModalComments = () => {
		console.log("toggle modal");
		setModalCommentsOpen(!modalCommentsOpen);
	};
	let navigate = useNavigate();

	const modifierCreation = () => {
		console.log(data);
		navigate("../../ajoutCreation", { state: data });
	};

	const likeRef = useRef();
	const imagePrincipale = useRef();

	const animateLike = () => {
		gsap.to(likeRef.current, { scale: 1.2, duration: 0.3, ease: Back.easeOut.config(4) });
	};
	const animateLike2 = () => {
		gsap.to(likeRef.current, { scale: 1, duration: 0.3, ease: Back.easeOut.config(4) });
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
		swipe: false,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

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
	console.log("user")
	console.log(user)
	const liker = () => {
		if (!liked) {
			axios.post("/api/likes/", { userId: user.userId, id_creation: data.id_creation, operation: "like" }).then((result) => {
				setLiked(true);
			});
		} else if (liked) {
			axios.post("/api/likes/", { userId: user.userId, id_creation: data.id_creation, operation: "dislike" }).then((result) => {
				setLiked(false);
			});
		}
	};
	const hoverInLegende = () => {
		console.log("int")

		gsap.to(imagePrincipale.current, { yPercent: -30, duration: 0.1, ease: "elastic.out(1, 0.3)" });

	}
	const hoverOutLegende = () => {
		console.log("out")
		gsap.to(imagePrincipale.current, { yPercent: 0, duration: 0.2, ease: "none" });


	}
	return (
		<div className={styles.cardContainer}>
			<Modal isOpen={modalCommentsOpen} onRequestClose={toggleModalComments} style={customStyles2} contentLabel="Example Modal">
				<div className={styles.cardContainerModal2}>
					<HighlightOffIcon className={styles.icons} onClick={toggleModalComments} />
					<h1 style={{ textAlign: "center" }}>{data.nom}</h1>

					{comment && (
						<CommentSection
							currentUser={user ? { userId: user.userId, avatarUrl: "https://ui-avatars.com/api/name=" + user.username + "&background=random", name: user.username } : null}
							commentsArray={comment}
							setComment={setComment}
							signinUrl={signinUrl}
							signupUrl={signupUrl}
							creationId={data.id_creation}
						/>
					)}
				</div>
			</Modal>
			<Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel="Example Modal">
				<button className={styles.closeButton} onClick={() => setIsOpen(false)}>
					X
				</button>
				<div className={styles.cardContainerModal}>
					<Slider {...settingsModal}>
						<div className={styles.divCardContainerModal}>
							<img src={require("../../uploads/" + data.url[0])} onClick={() => toggleModalImage()} className={styles.cardImageModal} />
							{/* <img src={"/uploads/" + data.url[0]} onClick={() => toggleModalImage()} className={styles.cardImageModal} /> */}
						</div>
						<div className={styles.divCardContainerModal}>
							{/* <img src={"/uploads/" + data.url[1]} className={styles.cardImageModal} /> */}
							<img src={require("../../uploads/" + data.url[1])} className={styles.cardImageModal} />
						</div>
						<div className={styles.divCardContainerModal}>
							<img src={require("../../uploads/" + data.url[2])} className={styles.cardImageModal} />
						</div>
					</Slider>
				</div>
			</Modal>
			<div className={styles.divCardContainer}>
				<div className={styles.likeCommentContainer}>
					{!liked && <FavoriteBorderOutlinedIcon onMouseEnter={animateLike} onMouseLeave={animateLike2} ref={likeRef} onClick={liker} style={{ color: "black" }} />}
					{liked && <FavoriteRoundedIcon onClick={liker} style={{ color: "red" }} />}
					{nbrLike}
					<InsertCommentOutlinedIcon style={{ color: "black" }} onClick={toggleModalComments} />
					{nbrComments}
				</div>
				<img src={require("../../uploads/" + data.url[0])} onClick={() => toggleModalImage()} ref={imagePrincipale} className={styles.cardImage} />
			</div>


			<div onMouseEnter={hoverInLegende} onMouseLeave={hoverOutLegende} className={styles.legende}>
				<div className={styles.priceTag}>{data.prix}€</div>
				<div className={styles.title}>{data.nom}</div>
				<div className={styles.description}> {data.description}</div>
				{/* {isAdmin && <DeleteAndModifyByAdmin id={data.id_creation} refresh={refresh} modifierCreation={modifierCreation} />} */}
			</div>
		</div>
	);
};

export default Card;

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
const customStyles2 = {
	content: {
		top: "20%",
		left: "30%",
		right: "auto",
		// width:'30%',
		// height:"80%",
		bottom: "auto",
		// marginRight: "-50%",
		// transform: "translate(-100%, -40%)",
		borderRadius: "3rem",
		background: "linear-gradient(180deg, rgba(240, 200, 163, 1) 0%, rgb(243, 238, 234) 70%, rgb(243, 238, 234) 100%)",
	},
};