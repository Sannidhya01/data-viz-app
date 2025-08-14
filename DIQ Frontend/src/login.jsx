import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./cssFiles/login.css"
import { useNavigate } from 'react-router-dom';

function Login(){
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) =>{
        event.preventDefault();
        if(name.trim() === "" || pass.trim() === ""){
            alert("Enter username or password");
            return;
        }
        else{
            try{
                const response = await fetch("http://localhost:8000/authenticate", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                    body: JSON.stringify({username: name, password: pass}),
                }    
            );
                const data = await response.json();
                if(data.status){
                    navigate("/home", {replace: true});
                }
                else{
                    alert(data.message)
                }
            }
            catch (error){
                console.error("Error:", error);
            }
        }
    }

    const nameChangeHandler = (event) =>
    {
        setName(event.target.value);
    }

    const passChangeHandler = (event) =>
    {
        setPass(event.target.value);
    }

    const loginForm = <form onSubmit={handleLogin}>
        <input type = "text" value = {name} placeholder='Username' id='nameField' autoFocus onChange={nameChangeHandler} />
        <input type = "password" value = {pass} placeholder='Password' id='passField' onChange={passChangeHandler}/>
        <button type="submit" id = 'loginSubmit'>Login</button>
    </form>

    return (
        <>
            <h1 id="title">DataIQ</h1>
            <div id = 'loginForm'>
                <h3>Welcome back!</h3>
                {loginForm}
                <a id="registerLink" onClick={() => navigate("/register", {replace: true})}>Register a new account</a>
            </div>
        </>
    );
}

export default Login;