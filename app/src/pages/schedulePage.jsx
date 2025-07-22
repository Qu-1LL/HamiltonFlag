import GameCard from "../components/gameCard.jsx";
import '../styles/schedulePage.css'

import { useState, useEffect } from 'react'

export default function GameSchedule ({ games }) {

    const [groupedGames, setGroupedGames] = useState({})

    const handleGameClick = (game) => {
    //add handling unction here
    };

    useEffect(() => {
        let grouped = (games.reduce((acc, game) => {
            if (!acc[game.status]) {
                acc[game.status] = [];
            }
                acc[game.status].push(game);
                return acc;
        }, {}))
        setGroupedGames(grouped)
    }, [games])

    const statusOrder = ["past", "today", "future"];

    return (
        <div className="schedule-wrapper">
            <div className="schedule-container">
                <div className="schedule-header">
                    <h1 className="schedule-title">Game Schedule</h1>
                    <p className="schedule-subtitle">Click on any game to view details</p>
                </div>

                <div className="schedule-group-list">
                    {statusOrder.map((status) => {
                    const games = groupedGames[status];
                    if (!games || games.length === 0) return null;
                    return (
                    <div key={status} className="schedule-group">
                        <h2 className="schedule-status">
                        <span className={`status-dot ${status}`} />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        </h2>
                        <div className="game-list">
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} onClick={handleGameClick} />
                        ))}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
};
