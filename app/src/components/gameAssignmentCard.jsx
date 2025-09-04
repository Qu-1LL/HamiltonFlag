import { removeOfficial, addOfficial } from '../hooks/scheduleHandler.js'
import { useState, useEffect } from 'react'

export default function GameAssignmentCard({ game, officials, officialsDict }) {
    const [assignedOfficials, setAssignedOfficials] = useState(officials || [])

    const [unassignedOfficials, setUnassignedOfficials] = useState(Object.values(officialsDict).filter(
        (official) => !assignedOfficials.includes(official.id)
    ))

    const formattedDate = new Date(game.date).toLocaleDateString();

    function removeOfficialFromGame(officialId) {
        try {
            removeOfficial(officialId, game.id)
            setAssignedOfficials(prev =>
                prev.filter(id => id !== officialId)
            )
            setUnassignedOfficials(prev => [
                ...prev,
                officialsDict[officialId] 
            ])

        } catch (e) {
            console.error('failed to remove official from game: ', e, e.stack)
        }
    }

    useEffect(() => {
        setAssignedOfficials([...officials])
        setUnassignedOfficials([])
        setUnassignedOfficials([...Object.values(officialsDict).filter(
            (official) => !officials.includes(official.id)
        )])

        console.log(officials)
        console.log(assignedOfficials)
        console.log(unassignedOfficials)
    }, [officials]);

    function addOfficialToGame(officialId) {

        try {
            addOfficial(officialId, game.id)
            setUnassignedOfficials(prev =>
                prev.filter(official => official.id !== Number(officialId))
            )
            setAssignedOfficials(prev => [
                ...prev,
                Number(officialId)
            ])

        } catch (e) {
            console.error('failed to add official to game: ', e, e.stack)
        }


    }

    return (
        <div className="game-card">
        <div className="game-info">
            <h2>{formattedDate}</h2>
            <p>
            {game.startTime} - {game.endTime}
            </p>
            <p>
            {game.location} ({game.field})
            </p>
        </div>

        <div className="officials-list">
            <h3>Officials</h3>
            <ul>
            {console.log(assignedOfficials)}
            {assignedOfficials.map((id) => {
                const official = officialsDict[id];
                return (
                <li key={id} className="official-item">
                    {official ? `${official.firstName} ${official.lastName}` : "Unknown"}
                    <button className="remove-btn" onClick={() => removeOfficialFromGame(official.id)}>X</button>
                </li>
                );
            })}

            <li>
                <select className="official-select" onChange={(e) => addOfficialToGame(e.target.value)}>
                <option value="">Assign new official...</option>
                {unassignedOfficials.map((official) => (
                    <option 
                        key={official.id} 
                        value={official.id}
                    >
                    {official.firstName} {official.lastName}
                    </option>
                ))}
                </select>
            </li>
            </ul>
        </div>
        </div>
    );
}