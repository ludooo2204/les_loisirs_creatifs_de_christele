import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "./Card/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

// import {CommentSection} from './CommentSection'
// import data from "./CommentSection/components/data.json"
// console.log("data")
// console.log(data)
//AJOUTER PROPS OU STATE USER (POUR RECUPERER LES LIKES/ COMMENTS)
const Creations = () => {
	const [bddCréation, setBddCréation] = useState(null);
	const [refreshProp, setRefresh] = useState(0);
	const [liked, setLiked] = useState(null);
	const [isAdmin, setAdmin] = useState(false);

	const user = useSelector((state) => state.user);

	// const [comment, setComment] = useState(null)
	// // const [comment, setComment] = useState(data)
	// const userId = "01a"
	// const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
	// const name = "xyz"
	// const signinUrl = "/signin"
	// const signupUrl = "/signup"
	// let count = 0
	// if (comment) comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

	console.log("user")
	console.log(user)
	useEffect(() => {
		axios.get("/api/creations").then((e) => {
			const temp = [...e.data];
			for (const iterator of temp) {
				iterator.url = iterator.images.map((e) => e.url);
				delete iterator.images;
			}

			if (e.data) setBddCréation(temp);
		});
	}, [refreshProp]);

	useEffect(() => {

		if (user) {
			if (user.roles.includes('ROLE_ADMIN')) setAdmin(true)
			axios.get("/api/liked/" + user.userId).then((e) => {

				const likedTemp = e.data.map(like => like.id_creation)
				setLiked(likedTemp)
			});
		}
	}, [user]);

	const refresh = () => {
		setRefresh(refreshProp + 1);
	};
	let navigate = useNavigate();
	console.log("liked from crea")
	console.log(liked)
	console.log("bddcreation")
	console.log(bddCréation)
	return (
		<div className={styles.main}>
			{bddCréation && liked && bddCréation.map((e, i) => <Card key={i} data={e} refresh={refresh} likee={liked.includes(e.id_creation)} />)}
			{bddCréation && !liked && bddCréation.map((e, i) => <Card key={i} data={e} refresh={refresh} likee={null} />)}

			<ReactTooltip className="" globalEventOff="click" place="bottom" type="light" effect="float" id="add">
				<h3>Ajouter une création</h3>
				<p>Clique ici pour ajouter une de tes nouvelles créations</p>
			</ReactTooltip>
			{isAdmin && <AddCircleIcon data-tip data-for="add" onClick={() => navigate("../ajoutCreation")} className={styles.addCreation} />}
			{/* {comment && <CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name: name }} commentsArray={comment}
				setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl} />} */}
		</div>
	);
};

export default Creations;
