import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { completeMission, getCompletedMissionsByUser, getMissionsByTrackId, deleteCompletedMission } from "../handler/databaseApiHandler"; 

/**
 * Componente Card per visualizzare una traccia musicale con le sue mission.
 * Tramite un menu a espansione si possono visualizzare le varie missioni
 * associate alla traccia e segnarle come completate assegnando il completamento
 * all'utente userId.
 * 
 * @param {number} id - id della traccia
 * @param {string} title - titolo della traccia
 * @param {string} artistName - nome dell'artista
 * @param {number} userId - id dell'attuale utente
 * @param {Function} [props.onToggleMission] - Callback chiamata quando una mission viene completata/decompletata
 * @returns {JSX.Element}
 * */
function TrackCard({ id, title, artistName, userId, onToggleMission }){
    const [expanded, setExpanded] = useState(false);
    const [missions, setMissions] = useState([]);
    const [completedMissions, setCompleted] = useState([]); 

    useEffect(() => {
        if (expanded && missions.length === 0) { // carica solo la prima volta
            getMissionsByTrackId(id)
                .then((data) => setMissions(data))
                .catch((err) => console.log(err));

            getCompletedMissionsByUser(userId)
                .then((data) => setCompleted(data))
                .catch((err) => console.log(err));
        }
    }, [expanded, id, missions.length, userId]);

    const toggleMission = async (missionId) => {
        const completed = completedMissions.filter(cm => cm.mission_id === missionId && cm.user_id === userId);

        try {
            if(completed.length === 0){
                const newCompleted = await completeMission(userId, missionId); 
                setCompleted(prev => [...prev, newCompleted]);
            } else {
                await deleteCompletedMission(completed[0].id);
                setCompleted(prev => prev.filter(cm => cm.mission_id !== missionId && cm.userId !== userId));
            }

            if (onToggleMission)
                onToggleMission(missionId, true); // Notifica il cambiamento del completamento della missione
        } catch (error) {
            console.error("Errore toggle mission:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-content">
                <div className="level">
                    {/* Testo e immagine di copertina */}
                    <div className="level-left">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                <img src="https://i.pinimg.com/736x/8e/56/07/8e5607ad1e901090c3bd666286f713b2.jpg" alt="Track image"/>
                                </figure>
                            </div>

                            <div className="media-content" style={{ textAlign: "left" }}>
                                <p className="title is-4">{ title }</p>
                                <p className="subtitle is-6">{ artistName }</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottone per l'espansione */}
                    <div className="level-right">
                        <button className="button" 
                                onClick={() => setExpanded(!expanded)} 
                                style={{ border: "none", boxShadow: "none" }}>
                            <FaChevronDown color="white" />
                        </button>
                    </div>
                </div>

                <div className="content">
                    {/* Contenuto espandibile */}
                    {expanded && (
                        <div className="control">
                            {missions.map((mission) => {
                                const isCompleted = completedMissions.some(cm => cm.mission_id === mission.id);
                                return (
                                    <div key={mission.id} className="field is-grouped is-align-items-center mt-2">
                                        <div className="control">
                                            <input 
                                                className="checkbox" 
                                                type="checkbox" 
                                                checked={isCompleted} 
                                                onChange={() => toggleMission(mission.id)} 
                                                style={{ width: "2em", height: "2em" }} // aumenta la dimensione
                                            />
                                        </div>

                                        <div className="control" style={{ wordBreak: "break-word" }}>
                                            <p className="label has-text-wrap">{mission.title} - {mission.points} pts</p>
                                        </div>
                                    </div>
                            )})}
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) 
}

export default TrackCard;