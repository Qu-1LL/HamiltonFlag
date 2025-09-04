import TimeCard from "../components/timeCard.jsx";
import '../styles/availabilityPage.css'


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { submitAvailability } from '../hooks/scheduleHandler.js'

export default function AvailabilityPage ({ userInfo }) {

    const navigate = useNavigate()

    const [flyingSched, setFlyingSched] = useState({})

    const today = new Date(2025, 3, 30)
    const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;

    const nextThursday = new Date(today.getTime() + daysUntilThursday * 24 * 60 * 60 * 1000)
    const nextFriday = new Date(today.getTime() + daysUntilFriday * 24 * 60 * 60 * 1000)

    useEffect(() => {
       setFlyingSched({...userInfo['availability']})
    }, [userInfo])
    
    //replace with a way to grab official's saved schedule

    const handleGameClick = (game) => {
        navigate(`/game/${game.id}`)
    };

    const gameToggled = (date, time) => {
        flyingSched[date.getTime()][time] = !flyingSched[date.getTime()][time]
        setFlyingSched(flyingSched)
        console.log(flyingSched)
    }

    function submitSched() {
        submitAvailability(userInfo['id'], flyingSched)
    }

    return (
        <div className="schedule-wrapper">
            <div className="schedule-container">
                <div className="schedule-header">
                    <h1 className="schedule-title">Confim Availability</h1>
                    <p className="schedule-subtitle">Toggle each game to confirm your availability</p>
                </div>

                <div className="schedule-group-list">
                        
                    <div className="schedule-group">
                        
                        <div className="game-list">
                            {[nextThursday, nextFriday].map(date => (
                                <TimeCard
                                key={date.getDate()}
                                date={date}
                                toggleSched={gameToggled}
                                availability={userInfo['availability']}
                                />
                            ))}
                            </div>
                    </div>
                    
                </div>
            </div>
            <button className="confirm-button" onClick={() => {submitSched()}}>Confirm</button>
        </div>
    );
};
