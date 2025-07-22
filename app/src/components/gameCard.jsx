
import '../styles/gameCard.css'

export default function GameCard ({ game, onClick }) {

    let months = {1:'Jan',2:'Feb',3:'Mar',4:'Apr',5:'May',6:'Jun',7:'July',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'}

    return (
        <div
            className="game-card"
            onClick={() => onClick(game)}
            onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
        >
            <div className="card-content">
                <div className="card-teams">
                    <div className={`status-bar ${game.status}`} />
                    <div className="teams">
                        <span className="team-name">{game.homeTeam}</span>
                        <span className="vs">vs</span>
                        <span className="team-name">{game.awayTeam}</span>
                    </div>
                </div>
                <div className="card-datetime">
                    <div className="card-date">
                        <span className="date-number">{game.date}</span>
                        <span className="date-month">{months[game.month]}</span>
                    </div>
                    <div className="card-time">{game.time}</div>
                </div>
            </div>
        </div>
    );
};