import axios from "axios"

const API_BASE_URL = 'http://localhost:8000';

// ================== USERS ==================

/**
 * Crea un nuovo utente con il nickname specificato
 * @async
 * @param {string} nickname - Nickname dell'utente da creare
 * @returns {Promise<Object>} Oggetto utente creato
 * @throws {Error} Se la creazione fallisce
 */
export const createUser = async (nickname) => {
    try {
        const params = { nickname: nickname }
        const response = await axios.post(`${API_BASE_URL}/users/`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error creating user';
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutti gli utenti dal database
 * @async
 * @returns {Promise<Array<Object>>} Array di oggetti utente
 * @throws {Error} Se il recupero fallisce
 */
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting users";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera un utente specifico tramite il suo ID
 * @async
 * @param {number} userId - ID dell'utente da recuperare
 * @returns {Promise<Object>} Oggetto utente
 * @throws {Error} Se l'utente non viene trovato o il recupero fallisce
 */
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting user by id";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera un utente specifico tramite il suo nickname
 * @async
 * @param {string} nickname - Nickname dell'utente da recuperare
 * @returns {Promise<Object>} Oggetto utente
 * @throws {Error} Se l'utente non viene trovato o il recupero fallisce
 */
export const getUserByNickname = async (nickname) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/by-nickname/${nickname}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting user by nickname";
        throw new Error(errorMessage);
    }
};

/**
 * Elimina un utente dal database
 * @async
 * @param {number} userId - ID dell'utente da eliminare
 * @returns {Promise<Object>} Conferma dell'eliminazione
 * @throws {Error} Se l'eliminazione fallisce
 */
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error deleting user";
        throw new Error(errorMessage);
    }
};

// ================== TRACKS ==================

/**
 * Crea una nuova traccia musicale
 * @async
 * @param {string} title - Titolo della traccia
 * @param {string} artistName - Nome dell'artista
 * @returns {Promise<Object>} Oggetto traccia creata
 * @throws {Error} Se la creazione fallisce
 */
export const createTrack = async (title, artistName) => {
    try {
        const params = {
            title: title,
            artist_name: artistName
        }

        const response = await axios.post(`${API_BASE_URL}/tracks/`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error creating track';
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutte le tracce musicali dal database
 * @async
 * @returns {Promise<Array<Object>>} Array di oggetti traccia
 * @throws {Error} Se il recupero fallisce
 */
export const getTracks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tracks/`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error getting tracks';
        throw new Error(errorMessage);
    }
};

/**
 * Recupera una traccia specifica tramite il suo ID
 * @async
 * @param {number} trackId - ID della traccia da recuperare
 * @returns {Promise<Object>} Oggetto traccia
 * @throws {Error} Se la traccia non viene trovata o il recupero fallisce
 */
export const getTrack = async (trackId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error getting track';
        throw new Error(errorMessage);
    }
};

/**
 * Aggiorna i dati di una traccia esistente
 * @async
 * @param {number} trackId - ID della traccia da aggiornare
 * @param {string|null} [title=null] - Nuovo titolo (opzionale)
 * @param {string|null} [artistName=null] - Nuovo nome artista (opzionale)
 * @returns {Promise<Object>} Oggetto traccia aggiornata
 * @throws {Error} Se l'aggiornamento fallisce
 */
export const updateTrack = async (trackId, title = null, artistName = null) => {
    try {
        const params = {};
        if (title !== null) 
            params.title = title;
        if (artistName !== null) 
            params.artist_name = artistName;
        
        const response = await axios.put(`${API_BASE_URL}/tracks/${trackId}`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error updating tracks';
        throw new Error(errorMessage);
    }
};

/**
 * Elimina una traccia dal database
 * @async
 * @param {number} trackId - ID della traccia da eliminare
 * @returns {Promise<Object>} Conferma dell'eliminazione
 * @throws {Error} Se l'eliminazione fallisce
 */
export const deleteTrack = async (trackId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Error deleting tracks';
        throw new Error(errorMessage);
    }
};

// ================== MISSIONS ==================

/**
 * Crea una nuova mission associata a una traccia
 * @async
 * @param {number} trackId - ID della traccia associata
 * @param {string} title - Titolo della mission
 * @param {number} points - Punti assegnati per il completamento
 * @returns {Promise<Object>} Oggetto mission creata
 * @throws {Error} Se la creazione fallisce
 */
export const createMission = async (trackId, title, points) => {
    try {
        const params = { track_id: trackId, title, points };
        const response = await axios.post(`${API_BASE_URL}/missions/`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error creating mission";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutte le mission dal database
 * @async
 * @returns {Promise<Array<Object>>} Array di oggetti mission
 * @throws {Error} Se il recupero fallisce
 */
export const getMissions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/missions/`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting missions";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera una mission specifica tramite il suo ID
 * @async
 * @param {number} missionId - ID della mission da recuperare
 * @returns {Promise<Object>} Oggetto mission
 * @throws {Error} Se la mission non viene trovata o il recupero fallisce
 */
export const getMission = async (missionId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/missions/${missionId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting mission";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutte le mission associate a una traccia specifica
 * @async
 * @param {number} trackId - ID della traccia
 * @returns {Promise<Array<Object>>} Array di oggetti mission
 * @throws {Error} Se il recupero fallisce
 */
export const getMissionsByTrackId = async (trackId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/missions/by-track/${trackId}`);
        return response.data;
    }catch (error){
        const errorMessage = error.response?.data?.detail || "Error getting missions by track id";
        throw new Error(errorMessage);
    }
};

/**
 * Aggiorna i dati di una mission esistente
 * @async
 * @param {number} missionId - ID della mission da aggiornare
 * @param {string|null} [title=null] - Nuovo titolo (opzionale)
 * @param {number|null} [points=null] - Nuovi punti (opzionale)
 * @returns {Promise<Object>} Oggetto mission aggiornata
 * @throws {Error} Se l'aggiornamento fallisce
 */
export const updateMission = async (missionId, title = null, points = null) => {
    try {
        const params = {};
        if (title !== null) params.title = title;
        if (points !== null) params.points = points;

        const response = await axios.put(`${API_BASE_URL}/missions/${missionId}`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error updating mission";
        throw new Error(errorMessage);
    }
};

/**
 * Elimina una mission dal database
 * @async
 * @param {number} missionId - ID della mission da eliminare
 * @returns {Promise<Object>} Conferma dell'eliminazione
 * @throws {Error} Se l'eliminazione fallisce
 */
export const deleteMission = async (missionId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/missions/${missionId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error deleting mission";
        throw new Error(errorMessage);
    }
};

// ================== COMPLETED MISSIONS ==================

/**
 * Registra il completamento di una mission da parte di un utente
 * @async
 * @param {number} userId - ID dell'utente che completa la mission
 * @param {number} missionId - ID della mission completata
 * @returns {Promise<Object>} Oggetto completed mission creato
 * @throws {Error} Se la registrazione fallisce
 */
export const completeMission = async (userId, missionId) => {
    try {
        const params = { user_id: userId, mission_id: missionId };
        const response = await axios.post(`${API_BASE_URL}/completed-missions/`, null, { params });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error completing mission";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutte le mission completate dal database
 * @async
 * @returns {Promise<Array<Object>>} Array di oggetti completed mission
 * @throws {Error} Se il recupero fallisce
 */
export const getCompletedMissions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/completed-missions/`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting completed missions";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera una mission completata specifica tramite il suo ID
 * @async
 * @param {number} completedId - ID della completed mission
 * @returns {Promise<Object>} Oggetto completed mission
 * @throws {Error} Se non viene trovata o il recupero fallisce
 */
export const getCompletedMission = async (completedId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/completed-missions/${completedId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting completed mission";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera tutte le mission completate da un utente specifico
 * @async
 * @param {number} userId - ID dell'utente
 * @returns {Promise<Array<Object>>} Array di oggetti completed mission dell'utente
 * @throws {Error} Se il recupero fallisce
 */
export const getCompletedMissionsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/completed-missions/by-user/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting user's completed missions";
        throw new Error(errorMessage);
    }
};

/**
 * Elimina una mission completata dal database (decompleta la mission)
 * @async
 * @param {number} completedId - ID della completed mission da eliminare
 * @returns {Promise<Object>} Conferma dell'eliminazione
 * @throws {Error} Se l'eliminazione fallisce
 */
export const deleteCompletedMission = async (completedId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/completed-missions/${completedId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error deleting completed mission";
        throw new Error(errorMessage);
    }
};

// ================== LEADERBOARD ==================

/**
 * Recupera il punteggio totale di un utente specifico
 * @async
 * @param {number} userId - ID dell'utente
 * @returns {Promise<Object>} Oggetto contenente i punti totali dell'utente
 * @throws {Error} Se il recupero fallisce
 */
export const getUserPoints = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user-points/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting user points";
        throw new Error(errorMessage);
    }
};

/**
 * Recupera la classifica completa degli utenti ordinata per punteggio
 * @async
 * @returns {Promise<Array<Object>>} Array di utenti con nickname e punti, ordinato dal punteggio più alto
 * @throws {Error} Se il recupero fallisce
 */
export const getLeaderboard = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/leaderboard/`)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.detail || "Error getting leaderboard";
        throw new Error(errorMessage);
    }
};
