import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReactTooltip from "react-tooltip";
import isEmail from "validator/lib/isEmail";
import { useSearchParams } from "react-router-dom";

import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers.svg";
import axios from "axios";

const RenouvellerPassword = () => {
	let [searchParams, setSearcheParams] = useSearchParams();
	let email = searchParams.get("email");
	let token = searchParams.get("token");
	console.log("email");
	console.log(email);
	console.log("email");
	console.log(email);
	return (
		<>
			<div>RenouvellerPassword</div>
			<div>{email}</div>
			<div>{token}</div>
            <input></input>
            <input></input>
            <input></input>
		</>
	);
};

export default RenouvellerPassword;
