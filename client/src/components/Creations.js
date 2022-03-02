import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Card from "./Card/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import {CommentSection} from './CommentSection'
import data from "./CommentSection/components/data.json"
console.log("data")
console.log(data)
//AJOUTER PROPS OU STATE USER (POUR RECUPERER LES LIKES/ COMMENTS)
const userId=1
const Creations = ({ isAdmin,user }) => {
	const [bddCréation, setBddCréation] = useState(null);
	const [refreshProp, setRefresh] = useState(0);
	const [liked, setLiked] = useState(null);


	const [comment, setComment] = useState(null)
	// const [comment, setComment] = useState(data)
	const userId = "01a"
	const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
	const name = "xyz"
	const signinUrl = "/signin"
	const signupUrl = "/signup"
	let count = 0
	if (comment) comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )



	useEffect(() => {
		axios.get("/api/creations").then((e) => {
			console.log("products fecth");
			console.log(e);
			const temp = [...e.data];
			console.log(temp)
			for (const iterator of temp) {
				iterator.url = iterator.images.map((e) => e.url);
				delete iterator.images;
			}

			console.log("temp");
			console.log(temp);
			if (e.data) setBddCréation(temp);
			setComment(temp[0].comments)
		});
	}, [refreshProp]);

	useEffect(() => {
		axios.get("/api/liked/"+userId).then((e) => {
			console.log("fetch liked")
			console.log(e)
		const likedTemp=e.data.map(like=>like.id_creation)
		setLiked(likedTemp)
		});
	}, []);

	const refresh = () => {
		console.log("refresh from creation");
		setRefresh(refreshProp + 1);
	};
	let navigate = useNavigate();
	return (
		<div className={styles.main}>
			{bddCréation && liked && bddCréation.map((e) => <Card isAdmin={isAdmin} data={e} refresh={refresh} likee={liked.includes(e.id_creation)} user={user} />)}

			<ReactTooltip className="" globalEventOff="click" place="bottom" type="light" effect="float" id="add">
				<h3>Ajouter une création</h3>
				<p>Clique ici pour ajouter une de tes nouvelles créations</p>
			</ReactTooltip>
			{isAdmin && <AddCircleIcon data-tip data-for="add" onClick={() => navigate("../ajoutCreation")} className={styles.addCreation} />}
			{comment&&<CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name: name }} commentsArray={comment}
 setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl}/>}
		</div>
	);
};

export default Creations;
