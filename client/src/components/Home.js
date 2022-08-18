import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Main from "./Main";
import Creations from "./Creations";
import QuiSuisJe from "./QuiSuisJe/QuiSuisJe";
import Contact from "./Contact/Contact";
import Evenements from "./Evenements/Evenements";
import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import AjoutCreation from "./AjoutCreation/AjoutCreation";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";


const Home = () => {
	const [isAdminProp, setIsAdminProp] = useState(false);
	const [defaultIsOpen, setDefaultIsOpen] = useState(false);
	const [user, setUser] = useState(null);



	const isAdmin = (info) => {
		setIsAdminProp(true)
	}
	return (
		<Router>
			<Navbar isAdmin={isAdmin} defaultIsOpen={defaultIsOpen} setUser={setUser} />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="Creations" element={<Creations isAdmin={isAdminProp} user={user} />} />
				<Route path="QuiSuisJe" element={<QuiSuisJe />} />
				<Route path="Contact" element={<Contact />} />
				<Route path="Evenements" element={<Evenements />} />
				<Route path="ajoutCreation" element={<AjoutCreation />} />
				<Route path="reset-password" element={<RenouvellerPassword />} />
			</Routes>
		</Router>
	);
};

export default Home;
