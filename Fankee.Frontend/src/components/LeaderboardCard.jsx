import { useState, useEffect } from "react"
import { FaSync } from "react-icons/fa";
import { getLeaderboard } from "../handler/databaseApiHandler"

/**
 * Componente per visualizzare la classifica degli utenti.
 * Mostra una tabella con posizione, nickname e punteggio di ogni utente.
 * L'utente corrente (se ha più di 0 punti) viene evidenziato.
 * 
 * @param {string} nickname - Nickname dell'utente corrente da evidenziare
 * @returns {JSX.Element}
 */
function LeaderboardCard({ nickname }) {
    const [leaderboard, setLeaderboard] = useState([]);

    const loadLeaderboard = async () => {
        try {
            const data = await getLeaderboard();
            setLeaderboard(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadLeaderboard();
    }, []);

    if(leaderboard.length === 0){
        return (
            <div className="level mb-3">
                <div className="level-left"></div>
                
                <div className="level-item">
                    <p>Empty leaderboard</p>
                </div>
                
                <div className="level-right">
                    <button 
                        className="button" 
                        onClick={loadLeaderboard} 
                        style={{ border: "none", boxShadow: "none" }}>
                            <FaSync color="white" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="section">
            {/* Header con titolo e bottone refresh */}
            <div className="level mb-3">
                <div className="level-left"></div>
                
                <div className="level-item">
                    <h1 className="title is-2 is-text-primary">Leaderboard</h1>
                </div>
                
                <div className="level-right">
                    <button 
                        className="button" 
                        onClick={loadLeaderboard} 
                        style={{ border: "none", boxShadow: "none" }}>
                            <FaSync color="white" />
                    </button>
                </div>
            </div>

            <table className="table is-fullwidth is-bordered">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th className="has-text-centered">Nickname</th>
                        <th className="has-text-right">Points</th>
                    </tr>
                </thead>

                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr
                            key={user.nickname} 
                            className={user.nickname === nickname ? "is-current-user" : ""}>
                            <td className="has-text-left">
                                {index === 0 && "🥇"}
                                {index === 1 && "🥈"}
                                {index === 2 && "🥉"}
                                {index > 2 && index + 1}
                            </td>

                            <td className="has-text-weight-semibold has-text-centered">
                                {user.nickname}
                            </td>

                            <td className="has-text-right">
                                {user.points} pt
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style>
                {`
                    .is-current-user {
                        background-color: rgba(255, 215, 0, 0.15);
                        font-weight: bold;
                    }
                `}
            </style>
        </div>
    )
}

export default LeaderboardCard;