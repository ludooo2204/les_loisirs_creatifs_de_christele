// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const config = {
	apiKey: "AIzaSyA7Op3GsZJePjR6msXDwwn0X6uNqEQQk9c",
	authDomain: "testfirebase-20be9.firebaseapp.com",
	projectId: "testfirebase-20be9",
	storageBucket: "testfirebase-20be9.appspot.com",
	messagingSenderId: "496784973940",
	appId: "1:496784973940:web:9c827f7f8f04af9aad7121",
};
firebase.initializeApp(config);

const db = getFirestore();

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "popup",
	// We will display Google and Facebook as auth providers.
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID],
	callbacks: {
		// Avoid redirects after sign-in.
		signInSuccessWithAuthResult: () => false,
	},
};

function SignInScreen() {
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
	const [bdd, setBdd] = useState(null); // Local signed-in state.
	let photos = [];
	useEffect(() => {
		getDocs(collection(db, "utilisateurs"))
			.then((doc) => {
				console.log("doc", doc);
				// doc.forEach((docs) => {
				// 	console.log(`${docs.id} => ${docs.data()}`);
				// 	console.log(docs.data());
				// });
				const bddTemp = doc.docs.map((e) => e.data());
				console.log("bddTemp");
				console.log(bddTemp);
				setBdd(doc.docs.map((e) => e.data()));

				bddTemp.forEach((element) => {
					photos.push(element.img);
				});
				console.log("photos");
				console.log(photos);
			})
			.catch((err) => {
				console.log("err", err);
			});
	}, []);

	const Add = (user) => {
		addDoc(collection(db, "utilisateurs"), user).then((e) => console.log("user ajouté", e));
	};
	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
			console.log(firebase.auth());

			setIsSignedIn(!!user);
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	
	if (!isSignedIn) {
		return (
			<div>
				<h1>My App</h1>
				<p>Please sign-in:</p>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</div>
		);
	}
	return (
		<div>
			<h1>My App</h1>
			{/* <img width={"250px"} src={"image/2.jpg"} /> */}

		
			{/* {console.log(bdd)}
			{bdd &&
				bdd.map(user => {return 	<div><h3>
                        {user.first}</h3>
                        <img width={"250px"} src={`image/${user.img}`} />
                        </div>
				})} */}
			{firebase.auth().currentUser.email == "vachon.ludovic@gmail.com" && <h1>Salut l'admin</h1>}
			<p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
			<button onClick={() => firebase.auth().signOut()}>Sign-out</button>
			<button
				onClick={() =>
					Add({
						first: "ludo",
						middle: "barrak",
						last: "vachon",
						born: 1981,
					})
				}
			>
				add User
			</button>
		</div>
	);
}

export default SignInScreen;
