import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import fankeeLogo from '../assets/fankee_logo.png';

import TrackCard from "../components/TrackCard"
import { getUserByNickname, getTracks, getUserPoints } from "../handler/databaseApiHandler"
import LeaderboardCard from "../components/LeaderboardCard";

/**
 * Componente per visualizzare la lista delle tracce musicali.
 * Mostra tutte le tracce disponibili come card espandibili con le relative mission.
 * 
 * @param {Array<Object>} tracks - Array di oggetti traccia da visualizzare
 * @param {number} userId - ID dell'utente corrente
 * @param {Function} onToggleMission - Callback chiamata quando viene completata/decompletata una mission
 * @returns {JSX.Element}
 */
function TrackList({ tracks, userId, onToggleMission }){
    if (tracks.length === 0){
        return (
            <div>
                <p>No tracks available</p>
            </div>
        )
    }
    
    return (
        <div>
            {tracks.map(track => (
                <div key={track.id} className="mb-4">
                    <TrackCard id = { track.id } title = {track.title} artistName = { track.artist_name } userId = { userId } onToggleMission={onToggleMission}></TrackCard>
                </div>
            ))}
        </div>
    ) 
}

/**
 * Componente principale della homepage dell'applicazione.
 * Gestisce la visualizzazione del punteggio dell'utente, delle tracce musicali disponibili
 * e della leaderboard. Permette la navigazione tra le diverse sezioni.
 * 
 * @returns {JSX.Element}
 */
function HomePage() {
    const { nickname } = useParams();
    const [userId, setUserId] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        getUserByNickname(nickname)
            .then((data) => { 
                setUserId(data.id)
                getUserPoints(data.id)
                    .then((data) => setUserPoints(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

        getTracks()
            .then((data) => setTracks(data))
            .catch((err) => console.log(err));


    }, []);

    const handleOnToggleMission = async () => {
        getUserPoints(userId)
            .then((data) => setUserPoints(data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="section has-text-centered">
            <header>
                <div className="level">
                    <div className="level-left">
                        <a href="https://www.fankee.com" target="_blank" rel="noopener noreferrer">
                            <img src={fankeeLogo} alt="Fankee logo" style={{ width: '100px' }} />
                        </a>
                    </div>

                    <div className="level-right">
                        <h1 className="title is-2" style={{ color: "var(--primary)" }}>
                            WELCOME {nickname}!
                        </h1>
                    </div>
                </div>

                <hr style={{ border: "none", height: "1px", backgroundColor: "#FFF5" }}/> {/* linea di separazione */}
            </header>

            <div className="section has-text-centered">
                <div className="buttons is-centered mb-4">
                    <a href="#tracks" className="button is-rounded" style={{width: "150px"}}>
                        Tracks
                    </a>
                    <a href="#leaderboard" className="button is-rounded" style={{width: "150px"}}>
                        Leaderboard
                    </a>
                </div>
            </div>

            <div id="tracks" className="section">
                <h1 className="title is-2 is-text-primary mb-4">Total points: {userPoints}</h1>
                <TrackList tracks={tracks} userId={userId} onToggleMission={handleOnToggleMission}/>
            </div>

            <div id="leaderboard">
                <LeaderboardCard nickname={nickname}></LeaderboardCard>
            </div>
        </div>
    );
}

export default HomePage;