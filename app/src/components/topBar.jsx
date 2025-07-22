import '../styles/topBar.css'

import { useNavigate } from 'react-router-dom'

export default function TopBar({ userInfo }) {

    const navigate = useNavigate()

    return (
        <div className="nav">
            <div className="dropdown">
                <button>Menu</button>
                <div className="dropdown-content">
                    {/* function that figures out the button options and puits them here */}
                    {userInfo.id == null && <button onClick={() => navigate('/login')}>Login</button>}
                </div> 
            </div>
            <div className="nametainer">
                {userInfo.title + " " + userInfo.name}
            </div>
        </div>
    )
}