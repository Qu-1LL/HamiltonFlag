import '../styles/topBar.css'

import { useNavigate } from 'react-router-dom'

export default function TopBar({ userInfo, setUserInfo }) {

    const navigate = useNavigate()

    function logOut() {
        setUserInfo({
            name: "Not Signed In",
            title: "",
            id: null
        })
        navigate('/schedule')
    }

    return (
        <div className="nav">
            <div className="dropdown">
                <button>Menu</button>
                <div className="dropdown-content">
                    {/* function that figures out the button options and puits them here */}
                    {userInfo.id == null && <button onClick={() => navigate('/login')}>Log In</button>}
                    {userInfo.title !== '' && <button onClick={() => logOut()}>Log Out</button>}
                    <button onClick={() => navigate('/schedule')}>Schedule</button>
                    {userInfo.title === 'Admin' && <button onClick={() => navigate('/contacts')}>Contacts</button>}
                    {userInfo.title === 'Admin' && <button onClick={() => navigate('/assignments')}>Assignments</button>}
                    {userInfo.title === 'Official' && <button onClick={() => navigate('/availability')}>Availability</button>}
                </div> 
            </div>
            <div className="nametainer">
                {userInfo.title + " " + userInfo.firstName}
            </div>
        </div>
    )
}