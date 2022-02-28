import React,{useState} from "react";
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
	const isAdmin=(info)=>{
		console.log(info + " from Home");
		setIsAdminProp(true)
	}
	return (
		<Router>
            <Navbar isAdmin={isAdmin} defaultIsOpen={defaultIsOpen}/>
			<Routes>
				<Route path="/" element={<Main defaultIsOpen={setDefaultIsOpen}/>} />
				<Route path="Creations" element={<Creations isAdmin={isAdminProp} />} />
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
