import '../styles/loginPage.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../hooks/loginHandler.js'

export default function LoginPage({ setUserInfo }) {

    const [errorMessage, setErrorMessage] = useState("no errors yet")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const findError = (e) => {
        //find error / attempt to login here
        setErrorMessage("no Error! Loading . . .");
        fillUserInfo()
        navigate('/')
    }

    const fillUserInfo = () => {
        loginUser(username, password, setUserInfo)
    }

    return (
        <div className="lin">
            <h1>Sign In</h1>
            <div className="input-block">
                Login: <br />
                <input type="text" className="input" spellCheck="false" onChange={(e) => {setUsername(e.target.value)}}/>
                <br />
                Password: <br />
                <input type="password" className="input" spellCheck="false" onChange={(e) => {setPassword(e.target.value)}}/>
                <br />
                <h3 className="error">{errorMessage}</h3> 
                <button className="confirm" onClick={(e) => {findError(e)}}>Confirm</button>
            </div>
        </div>
    );
}