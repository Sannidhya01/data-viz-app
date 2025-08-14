import { useEffect, useState } from 'react';
import './cssFiles/home.css';
import { useNavigate } from 'react-router-dom';

function Home(){

    const [datasets, setDatasets] = useState([])
    const navigate = useNavigate();

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

    const toUpload = () => {
        navigate("/upload_data", { replace: true });
    }

    useEffect(() => {
        const fetch_datasets = async () =>{
        try {
        const response = await fetch("http://localhost:8000/fetch_datasets", {
          method: "GET",
          credentials: "include", 
        });

        const datasetList = await response.json();
        setDatasets(datasetList)

      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    fetch_datasets()
}, []);

    function handleDatasetClick(id){
        navigate(`/show_dataset/${id}`, { replace: true });
    }


    return (
        <>
            <h1 id="title">DataIQ</h1>
            <div id = 'datasetView'>
                {datasets.map((dataset) => (
                    <div className='datasetCard' key = {dataset.id} onClick = {() => handleDatasetClick(dataset.id)}>
                        <h2>{dataset.name}</h2>
                        <p>Uploaded at {new Date(dataset.uploaded_at).toISOString().slice(0, 16).replace('T', ' ')}</p>
                    </div>
                )
                )}
                <div className='datasetCardNew' key = "newUpload" onClick = {toUpload}>
                    <h2>Upload New Datasets</h2>
                    <h2>+</h2>
                </div>
            </div>
            <button id="logoutButton" onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Home;