import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './cssFiles/show_dataset.css'
import { useNavigate } from "react-router-dom";
import Chart from "./chart";

function Show_dataset() {
  const { id } = useParams();
  const [dataset, setDataset] = useState([]);
  const navigate = useNavigate();

  const [possibleChartTypes, setPossibleChartTypes] = useState(
    <option value = "-" key = "-">-</option>
  );

  const [chartType, setChartType] = useState("-");
  const [xAxis, setXAxis] = useState("-");
  const [yAxis, setYAxis] = useState("-");

  const [chart, setChart] = useState(<h4>Invalid Chart Configuration</h4>)
  const [chartVisible, setchartVisible] = useState(false)

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch("http://localhost:8000/show_dataset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.dataset) {
          setDataset(data.dataset);
          const columns = Object.keys(data.dataset[0] || {});

        } else {
          alert("Unable to fetch dataset");
        }
      } catch (error) {
        console.error("Error fetching dataset:", error);
      }

    };

    fetchDataset();
  }, [id]);

  if (dataset.length === 0) {
    return <p>Loading...</p>;
  }

  const columns = Object.keys(dataset[0]);


  const toHome = () => {
        navigate("/home", { replace: true });
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

    function checkValidTypes(xAxis, yAxis){
        if(dataset.length === 0){
            return
        }

        if(xAxis === "-" && yAxis === "-"){
            setPossibleChartTypes(
                <option value = "-" key = "-">-</option>
            )
            return;
        }
        else if(typeof dataset[0][xAxis] === "string" && typeof dataset[0][yAxis] === "number"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                    <option value = "Bar">Bar</option>
                    <option value = "Line">Line</option>
                    <option value = "Pie">Pie</option>
                </>
            )
        }
        else if(typeof dataset[0][xAxis] === "number" && typeof dataset[0][yAxis] === "number"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                    <option value = "Bar">Bar</option>
                    <option value = "Line">Line</option>
                    <option value = "Scatter">Scatter</option>
                </>
            )
        }
        else if(typeof dataset[0][xAxis] === "number" && typeof dataset[0][yAxis] === "string"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                </>
            )
        }
        else if(typeof dataset[0][xAxis] === "string" && typeof dataset[0][yAxis] === "string"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                </>
            )
        }
        else if(typeof dataset[0][xAxis] === "number" && yAxis === "-"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                    <option value = "Histogram Bar">Histogram Bar</option>
                    <option value = "Histogram Pie">Histogram Pie</option>
                </>
            )
        }
        else if(typeof dataset[0][xAxis] === "string" && yAxis === "-"){
            setPossibleChartTypes(
                <>
                    <option value = "-" key = "-">-</option>
                    <option value = "Frequency Bar">Frequency Bar</option>
                    <option value = "Frequency Pie">Frequency Pie</option>
                </>
            )
        }

    }

    async function deleteDataset(id){
        try {
        const response = await fetch("http://localhost:8000/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.status) {
          alert("Dataset deleted successfully")
          navigate("/home", {replace: true});
        } else {
          alert("Unable to delete dataset");
        }
      } catch (error) {
        console.error("Error deleting dataset:", error);
      }
    }


    const showChart = (event) =>{
        event.preventDefault();

        if(xAxis === "-"){
            alert("Choose column for x-axis")
            return;
        }
        if((yAxis === "-" && chartType !== "Histogram Bar" && chartType !== "Frequency Bar" && chartType !== "Histogram Pie" && chartType !== "Frequency Pie")){
            alert("Choose column for y-axis")
            return;
        }
        if(chartType === "-"){
            alert("Choose a chart type")
            return
        }

        setChart(<Chart dataset = {dataset} xAxis = {xAxis} yAxis = {yAxis} chartType = {chartType} xType = {typeof dataset[0][xAxis]} yType = {typeof dataset[0][xAxis]}  />)
        setchartVisible(true)

    }

    const showTable = (event) => {
        setchartVisible(false)
    }

  return (
    <>
        <h1 id="title">DataIQ</h1>
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "70%", padding: "20px"}} id="rightDiv">
                {chartVisible ? chart : 
                    <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                            {columns.map((col) => (
                                <th key={col} style={{ padding: "8px", background: "#696969" }}>
                                {col}
                                </th>
                            ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataset.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map((col) => (
                                <td key={col} style={{ padding: "8px", textAlign: "center" }}>
                                    {row[col]}
                                </td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
            <div style={{ width: "30%", padding: "20px"}}>
                <form id = "chartOptions" onSubmit = {showChart}>
                    <label className="optionsLabel"> Select X-axis: &nbsp;
                        <select className="options" value={xAxis} onChange = {(event) => {
                                setXAxis(event.target.value)
                                checkValidTypes(event.target.value, yAxis);
                            }}>
                            <option value = "-" key = "-">-</option>
                            {columns.filter((col) => col !== yAxis).map((col) => <option value = {col} key = {col}>{col}</option>)}
                        </select>
                    </label><br/><br/>
                    <label className="optionsLabel"> Select Y-axis: &nbsp;
                        <select className="options" value={yAxis} onChange = {(event) => {
                                setYAxis(event.target.value);
                                checkValidTypes(xAxis, event.target.value);
                            }}>
                            <option value = "-" key = "-">-</option>
                            {columns.filter((col) => col !== xAxis).map((col) => <option value = {col} key = {col}>{col}</option>)}
                        </select>
                    </label><br/><br/>
                    <label className="optionsLabel"> Select chart type: &nbsp;
                        <select className="options" value={chartType} onChange = {(event) => {setChartType(event.target.value)}}>
                            {possibleChartTypes}
                        </select>
                    </label><br/><br/>
                    <button type="submit" id = 'chartOptionsSubmit'>Show visualization</button>
                </form>
            </div>
        </div>
        <button id="homeButton" onClick={toHome}>Home</button>
        <button id="showTable" onClick ={showTable}>Show Table</button>
        <button id="logoutButton" onClick={handleLogout}>Logout</button>
        <button id="deleteButton" onClick={() => deleteDataset(id)}>Delete Dataset</button>
    </>
  );
}

export default Show_dataset;
