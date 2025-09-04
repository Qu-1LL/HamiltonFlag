import GameCard from "../components/gameCard.jsx";
import '../styles/schedulePage.css'


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameSchedule ({ games, setGames } ) {

    const [groupedGames, setGroupedGames] = useState({})

    const navigate = useNavigate()

    const handleGameClick = (game) => {
        navigate(`/game/${game.id}`)
    };

    const [statusOrder,setStatusOrder] = useState({"past": true, "today": true, "future": true})

    function fillGroupedGames() {
        let grouped = (games.reduce((acc, game) => {
            if (!statusOrder[game.status]) {
                return acc
            } else if (!acc[game.status]) {
                acc[game.status] = [];
            }
                acc[game.status].push(game);
                return acc;
        }, {}))
        setGroupedGames(grouped)
    }

    // function sortGroupedGames() {
    //     Object.keys(groupedGames).forEach(key => {
    //         groupedGames[key].sort((a, b) => {
    //             if (a.date.month < b.date.month) {
    //                 return -1
    //             } else if (a.date.month > b.date.month) {
    //                 return 1
    //             } else if (a.date.date < b.date.date) {
    //                 return -1
    //             } else if (a.date.date > b.date.date) {
    //                 return 1
    //             } else {
    //                 return 0
    //             }
    //         });
    //     });
    //     console.log(groupedGames)
    // }

    useEffect(() => {
        fillGroupedGames()
        //sortGroupedGames()
    }, [games])

    function toggleGroup(status) {
        statusOrder[status] = !statusOrder[status]
        console.log(statusOrder)
        setStatusOrder(statusOrder)
        fillGroupedGames()
    }

    return (
        <div className="schedule-wrapper">
            <div className="schedule-container">
                <div className="schedule-header">
                    <h1 className="schedule-title">Game Schedule</h1>
                    <p className="schedule-subtitle">Click on any game to view details</p>
                </div>

                <div className="schedule-group-list">
                    {Object.keys(statusOrder).map((status) => {
                        const games = groupedGames[status];
                    if (!games || games.length === 0 || !statusOrder[status]) {
                        return (
                            <div key={status} className="schedule-group">
                                <h2 className="schedule-status">
                                    <label className={"dot-checkbox " + status} >
                                        <input type="checkbox" defaultChecked className={`status-dot ${status}`} onChange={() => {toggleGroup(status)}} />
                                        <span className={'checkmark ' + status}></span>
                                    </label>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </h2>
                            </div>
                        ) 
                    } else {
                        return (
                            <div key={status} className="schedule-group">
                                <h2 className="schedule-status">
                                    <label className={"dot-checkbox " + status} >
                                        <input type="checkbox" defaultChecked className={`status-dot ${status}`} onChange={() => {toggleGroup(status)}}/>
                                        <span className={'checkmark ' + status}></span>
                                    </label>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </h2>
                                <div className="game-list">
                                    {games.map((game) => (
                                        <GameCard key={game.id} game={game} onClick={handleGameClick} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                })}
                </div>
            </div>
        </div>
    );
};
