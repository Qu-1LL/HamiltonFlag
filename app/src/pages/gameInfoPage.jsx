import '../styles/gameInfoPage.css'
import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

export default function GameInfoPage ({ games }) {

    const navigate = useNavigate()
    const { id } = useParams()
    let game = null
    for (let myGame of games) {
        if (myGame.id == id) {
            game = myGame
            break
        }
    }

    return (

        <div className="game-wrapper">
            <h1>{game.date.month}/{game.date.date}, {game.startTime}</h1>
            <h2>{game.location}</h2>
            <h3>Home: {game.score.home} - Away: {game.score.away}</h3>
            <div className="team-flex">
                    {[game.homeTeam, game.awayTeam].map((team) => {
                        return (
                            <div key={team.id}>
                                <h3>{team.teamName}</h3>
                                <div className="team-block">
                                    {team.players.map((player) => {
                                        console.log(player)
                                        return (
                                            <div key={player.id} className="name-block">
                                                <span>{player.firstName} {player.lastName}</span>
                                                <span> - {player.jerseyNumber}</span>
                                            </div>
                                        )
                                    })}
                                    {team.personnel.map((coach) => {
                                        return (
                                            <div key={coach.id} className="coach-name">
                                                {coach.name}
                                            </div>
                                        ) 
                                    })}
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className="bottom-section">
                <button onClick={() => navigate("/schedule")}>Back</button>
                <div className="official-block">
                    <h3>Officials:</h3>
                    {game.officials.map((ref) => {
                        return(<span key={ref.id} className="official-name">{ref.name}</span>)
                    })}
                </div>
            </div>

        </div>

    )

}