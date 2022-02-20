import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./AjoutCreation.module.css";

const FileUploader = ({ onFileSelect, onFileSelectError, onFileSelectSuccess }) => {
	const fileInput = useRef(null);

	const handleFileInput = (e) => {
		// handle validations
		const file = e.target.files[0];

		if (file.size > 1000024) onFileSelectError({ error: "File size cannot exceed more than 10MB" });
		else onFileSelectSuccess(file);
		// else onFileSelectSuccess(e.target.files);
	};

	return (
		<div className="file-uploader">
			<input type="file" name="file" id="file" className={styles.inputFile} onChange={handleFileInput} />
			<label htmlFor="file">Ajouter une image</label>
			{/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" >coucou</button> */}
		</div>
	);
};

const InputImage = ({ Recupererfile }) => {
	const [name, setName] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	useEffect(() => {
	 if (selectedFile) submitForm()}
	, [selectedFile])
	
	const submitForm = () => {
		const formData = new FormData();
		// e.preventDefault();
		// console.log("selectedFileé");
		// console.log(selectedFile);
		// console.log('URL.createObjectURL(selectedFile)');
		// console.log(URL.createObjectURL(selectedFile));
		// formData.append("name", name);
		formData.append("file", selectedFile);
		axios
			.post("/api/images", formData)
			.then((res) => {
				// alert("File Upload success");
				// console.log("res");
				// console.log(res);
			})
			.catch((err) => alert("File Upload Error"));
		// formData.append("file", selectedFile);
		Recupererfile(selectedFile);
		// console.log("formData");
		// console.log(formData);
	};
	const handleSelect = (file) => {

		setSelectedFile(file);
	};
	return (
		<div className="App">
			<form>
				<FileUploader
					onFileSelectSuccess={(file) => {
						handleSelect(file);
					}}
					onFileSelectError={({ error }) => alert(error)}
				/>
				<br />
				{/* <button onClick={submitForm} className={`${styles.buttonValidation} ${styles.buttonSubmit}`}>
					Submit
				</button> */}
			</form>
		</div>
	);
};
export default InputImage;
