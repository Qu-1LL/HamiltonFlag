
import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'

import TopBar from './components/topBar.jsx'
import GameSchedule from './pages/schedulePage.jsx'
import LoginPage from './pages/loginPage.jsx'

export class Game {
    constructor(id, homeTeam, awayTeam, date, month, time, status) {
        this.id = id
        this.homeTeam = homeTeam
        this.awayTeam = awayTeam
        this.date = date
        this.month = month
        this.time = time
        this.status = status
    }
}

function App() {

    const [myGames, setMyGames] = useState([])
    const [loading, setLoading] = useState(true)

    function convertMilitary(timeStr) {
        const [hourStr, minuteStr] = timeStr.split(":");
        let hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        if (hour === 0) hour = 12; // 0 becomes 12 AM

        return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    }

    function sortGamesByDate(games) {
        return [...games].sort((a, b) => {
            if (a.month === b.month) {
                return a.date - b.date;
            }
            return a.month - b.month;
  });
}

    // fetch and set miniGames, dummy info for now
    const loadGameData = async (debug) =>  {

        try {
            let res = await fetch('http://localhost:3000/schedule')

            if (!res.ok) {
                throw new Error('Failed to fetch: '+res.error)
            }
            let json = await res.json()

            let mySchedule = []
            let i = 0
            for (let myItem of json.mySchedule) {
                i++
                let myDate = myItem.date.split('/')
                let myGroup = ''
                let theDate = null
                if (debug) {
                    theDate = new class {
                        getMonth() {
                            return 4
                        }
                        getDate() {
                            return 9
                        }
                    }
                } else {
                    theDate = new Date()
                }
                if (Number(myDate[0]) < theDate.getMonth() + 1) {
                    myGroup = 'past'
                } else if (Number(myDate[0]) > theDate.getMonth() + 1) {
                    myGroup = 'future'
                } else if (Number(myDate[1]) < theDate.getDate()) {
                    myGroup = 'past'
                } else if (Number(myDate[1]) > theDate.getDate()) {
                    myGroup = 'future'
                } else {
                    myGroup = 'today'
                }

                let theGame = new Game(
                    i, 
                    myItem.homeTeam.teamName, 
                    myItem.awayTeam.teamName, 
                    Number(myDate[1]), 
                    Number(myDate[0]), 
                    convertMilitary(myItem.startTime), 
                    myGroup

                )

                mySchedule = sortGamesByDate(mySchedule)
                
                mySchedule.push(theGame)
            }
            setMyGames(mySchedule)
        } catch (e) {
            //setError(e)
            console.log('Failed to fetch: '+ e)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        loadGameData(true)
    }, [])

    const [userInfo, setUserInfo] = useState({
        name: "Not Signed In",
        title: "",
        id: null
    })

    function Home() {
        return <GameSchedule games={myGames}  />
    }

    function Login() {
        return <LoginPage setUserInfo={setUserInfo} />
    }

    return (
        <div className="App">
            <Router>
                <TopBar userInfo={userInfo} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/about" element={<About />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
