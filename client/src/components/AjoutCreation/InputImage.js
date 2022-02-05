import React, { useRef, useState } from "react";
import axios from 'axios'

const FileUploader = ({onFileSelect,onFileSelectError,onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        console.log('files');
        console.log(e.target.files);
        console.log("file");
        console.log(file);
        if (file.size > 1000024)
          onFileSelectError({ error: "File size cannot exceed more than 10MB" });
        // else onFileSelectSuccess(file);
        else onFileSelectSuccess(e.target.files);
      };

    return (
        <div className="file-uploader">
            <input type="file" multiple onChange={handleFileInput} />
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary" >coucou</button> */}
        </div>
    )
}

const InputImage = ({Recupererfile}) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const submitForm = (e) => {
    const formData = new FormData();
    e.preventDefault();
    console.log("selectedFileé");
    console.log(selectedFile);
    // formData.append("name", name);
    for (const file of selectedFile) {
      console.log("file");
      console.log(file);
      formData.append("file", file);
      axios
      .post("/addProduct", formData)
      .then((res) => {
        alert("File Upload success");
        console.log("res");
        console.log(res);
      })
      .catch((err) => alert("File Upload Error"));
    }
    // formData.append("file", selectedFile);
    Recupererfile(selectedFile)
    console.log("formData");
    console.log(formData);
  
    // axios
    //   .post("/addProduct", formData)
    //   .then((res) => {
    //     alert("File Upload success");
    //     console.log("res");
    //     console.log(res);
    //   })
    //   .catch((err) => alert("File Upload Error"));
  };

  return (
    <div className="App">
      <form>
        

        <FileUploader   
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />

        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};
export default InputImage