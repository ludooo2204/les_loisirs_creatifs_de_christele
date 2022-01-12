import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Creations from "./Creations";
import QuiSuisJe from "./QuiSuisJe";
import Contact from "./Contact";
import Evenements from "./Evenements";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const Home = () => {
	return (
		<Router>
            <Navbar />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="Creations" element={<Creations />} />
				<Route path="QuiSuisJe" element={<QuiSuisJe />} />
				<Route path="Contact" element={<Contact />} />
				<Route path="Evenements" element={<Evenements />} />
			</Routes>
		</Router>
	);
};

export default Home;
