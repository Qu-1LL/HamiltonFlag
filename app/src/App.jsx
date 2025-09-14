
import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { loadGameData } from './hooks/scheduleHandler.js'
import TopBar from './components/topBar.jsx'
import GameSchedule from './pages/schedulePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import ContactsPage from './pages/contactsPage.jsx'
import GameInfoPage from './pages/gameInfoPage.jsx'
import AvailabilityPage from './pages/availabilityPage.jsx'
import ScrollToTop from './components/scrollToTop.jsx'
import AssignmentsPage from './pages/assignmentsPage.jsx'

function App() {

    console.log("app is open")

    const [userInfo, setUserInfo] = useState({
        name: "Not Signed In",
        title: "",
        id: null
    })
    const [games, setGames] = useState([])

    useEffect(() => {
        async function fetchData() {
            await loadGameData(setGames, true);
        }
        fetchData()
    }, [])

    function Home() {
        return <GameSchedule games={games} setGames={setGames}/>
    }

    function Login() {
        return <LoginPage setUserInfo={setUserInfo} />
    }

    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <TopBar userInfo={userInfo} setUserInfo={setUserInfo} />
                <Routes>
                    <Route path="/schedule" element={<Home />} />
                    <Route path="/" element={<Navigate to="/schedule" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/game/:id" element={<GameInfoPage games={games}/>} />
                    <Route path="/availability" element={<AvailabilityPage userInfo={userInfo}/>} />
                    <Route path="/assignments" element={<AssignmentsPage />} />
                    {/* <Route path="/schedule/editor" element={} />
                    <Route path="/schedule/officials-editor" element={} /> */}

                    {/* <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
