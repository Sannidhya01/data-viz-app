import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./cssFiles/login.css"
import { useNavigate } from 'react-router-dom';

function Register(){
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) =>{
        event.preventDefault();
        if(name.trim() === "" || pass.trim() === "" || email.trim() === "" || confirmPass.trim() === ""){
            alert("Fill all fields");
            return;
        }
        else{
            try{
                if(pass.trim() !== confirmPass.trim()){
                    alert("Please confirm password entered");
                    return;
                }
                const response = await fetch("http://127.0.0.1:8000/register", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials:"include",
                    body: JSON.stringify({username: name, password: pass, email: email}),
                }    
            );
                const data = await response.json();
                if(data.status){
                    alert(data.message)
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

    const emailChangeHandler = (event) =>
    {
        setEmail(event.target.value);
    }

    const confirmPassChangeHandler = (event) =>
    {
        setConfirmPass(event.target.value);
    }

    const registerForm = <form onSubmit={handleRegister}>
        <input type = "text" value = {name} placeholder='Username' id='nameField' autoFocus onChange={nameChangeHandler} />
        <input type = "text" value = {email} placeholder='Email' id='nameField' onChange={emailChangeHandler} />
        <input type = "password" value = {pass} placeholder='Password' id='passField' onChange={passChangeHandler}/>
        <input type = "password" value = {confirmPass} placeholder='Confirm Password' id='passField' onChange={confirmPassChangeHandler}/>
        <button type="submit" id = 'loginSubmit'>Register</button>
    </form>

    return (
        <>
            <h1 id="title">DataIQ</h1>
            <div id = 'loginForm'>
                <h3>Welcome! Register a new user</h3>
                {registerForm}
                <a id="loginLink" onClick={() => navigate("/login", {replace: true})}>Log into an existing account</a>
            </div>
        </>
    );
}

export default Register;