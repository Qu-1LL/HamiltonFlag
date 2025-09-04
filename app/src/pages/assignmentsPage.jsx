import '../styles/assignmentsPage.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getOfficialsDict, getWeeklyGames, setGameOfficials } from '../hooks/scheduleHandler.js'
import GameAssignmentCard from '../components/gameAssignmentCard.jsx'

export default function AssignmentsPage () {

    const [officialsDict, setOfficialsDict] = useState({})
    const [weeklyGames, setWeeklyGames] = useState([])

    async function generateSchedule() {
        await setGameOfficials()
        const officials = await getOfficialsDict()
        const games = await getWeeklyGames()
        setOfficialsDict({...officials})
        setWeeklyGames([...games])
    }

    useEffect(() => {
        async function fetchData() {
            const officials = await getOfficialsDict()
            const games = await getWeeklyGames()
            setOfficialsDict(officials)
            setWeeklyGames(games)
        }
        fetchData()
    }, [])


    //on boot:
    // get all officials
    //  put into dict of officialId: official object
    // get all weekly games in chronological list
    // display
    // changes made locally
    // call the backend when a player is added or removed using the associated functions

    return (
        <div className="assignments-page">
            <h1 className="page-title">Game Assignments</h1>
            <div className="dashboard-container">
                <h3>Confirmations</h3>
                <div className="name-container">
                    {Object.keys(officialsDict).map((id) => {
                        let myClass = "confirmed"
                        for (let game of weeklyGames) {
                            if (new Date(game.date).getTime() in officialsDict[id].availability == false) {
                                myClass = 'unconfirmed'
                                break
                            }
                        }
                        return (
                            <div className={myClass} key={id}>
                                {officialsDict[id].firstName} {officialsDict[id].lastName}
                            </div>
                        )
                    })}
                </div>
                <button className="simple-button" onClick={() => generateSchedule()}>
                    Generate New Schedule
                </button>
            </div>
            <div className="assignments-list">
                {weeklyGames.map((game) => (
                    <GameAssignmentCard
                        key={game['id']+ JSON.stringify(game.officials)}
                        game={game}
                        officials={game.officials}
                        officialsDict={officialsDict}
                    />
                ))}
            </div>
        </div>
    )
}