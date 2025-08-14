import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './cssFiles/upload.css';


function Upload_CSV(){
    const [file, setFile] = useState(null);
    const [datasetName, setDatasetName] = useState("");
    const navigate = useNavigate();

    const fileChangeHandler = (event) => {
        setFile(event.target.files[0]);
    }

    const changeDatasetName = (event) =>
    {
        setDatasetName(event.target.value);
    }

    const handleLogout = async () =>{
        try {
        const response = await fetch("http://localhost:8000/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
        });

        const data = await response.json();
        console.log("Verify logout response:", data);

        if (Boolean(data.status) === true) {
            navigate("/home", {replace: true});
            window.location.reload();
        } else {
            alert("Unable to logout")
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    const fileUploadHandler = async (event) => {
        event.preventDefault();

        if (!file || datasetName.trim() === ""){
            alert("Upload a file or enter name")
            return;
        }
        else{
            const formData = new FormData();
            formData.append('file', file)
            formData.append('datasetName', datasetName)

            try {
                const response = await fetch("http://localhost:8000/upload_data", {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                });
                const data = await response.json();
                if (data.status) {
                    navigate("/home", { replace: true });
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    const toHome = () => {
        navigate("/home", { replace: true });
    }

    
    const fileInputForm = <form onSubmit={fileUploadHandler}>
        <input type="file" accept=".csv" id="fileUpload" onChange={fileChangeHandler} />
        <input type="text" placeholder="Enter a name" id="datasetNameField" value = {datasetName} onChange={changeDatasetName} />
        <button type="submit" id = 'fileSubmit'>Upload</button>
    </form>

    return (
        <>
            <h1 id="title">DataIQ</h1>
            <div id="uploadForm">
                {fileInputForm}
                <button className="logoutButton" onClick={handleLogout}>Logout</button>
                <button className="homeButton" onClick={toHome}>Home</button>
            </div>
        </>
    );
}

export default Upload_CSV;