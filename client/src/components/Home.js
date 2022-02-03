import React,{useState} from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Creations from "./Creations";
import QuiSuisJe from "./QuiSuisJe";
import Contact from "./Contact";
import Evenements from "./Evenements";
import AjoutCreation from "./AjoutCreation/AjoutCreation";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const Home = () => {
	const [isAdminProp, setIsAdminProp] = useState(false);
	const isAdmin=(info)=>{
		console.log(info + " from Home");
		setIsAdminProp(true)
	}
	return (
		<Router>
            <Navbar isAdmin={isAdmin} />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="Creations" element={<Creations isAdmin={isAdminProp} />} />
				<Route path="QuiSuisJe" element={<QuiSuisJe />} />
				<Route path="Contact" element={<Contact />} />
				<Route path="Evenements" element={<Evenements />} />
				<Route path="ajoutCreation" element={<AjoutCreation />} />
			</Routes>
		</Router>
	);
};

export default Home;
