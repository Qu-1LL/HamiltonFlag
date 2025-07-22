import '../styles/loginPage.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function LoginPage({ setUserInfo }) {

    const [errorMessage, setErrorMessage] = useState("no errors yet")

    const navigate = useNavigate()

    const findError = (e) => {
        //find error / attempt to login here
        setUserInfo({
            name: "Dave",
            title: "Admin",
            id: 1
        })
        setErrorMessage("no Error! Loading . . .");
        navigate('/')
    }

    const fillUserInfo = () => {

    }

    return (
        <div className="lin">
            <h1>Sign In</h1>
            <div className="input-block">
                Login: <br />
                <input type="text" className="input" spellCheck="false" onChange={(e) => {fillUserInfo(e)}}/>
                <br />
                Password: <br />
                <input type="password" className="input"/>
                <br />
                <h3 className="error">{errorMessage}</h3> 
                <button className="confirm" onClick={(e) => {findError(e)}}>Confirm</button>
            </div>
        </div>
    );
}