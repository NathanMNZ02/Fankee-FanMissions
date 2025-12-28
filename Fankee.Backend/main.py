import database.crud as crud
from database.db import get_db
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, Query
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# Inizialize fast api
app = FastAPI(title="Fankee-FanMissions API")

origins = [
    "http://localhost:5173",  # URL del tuo frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # permette POST, GET, PUT, DELETE, ecc.
    allow_headers=["*"],
)

# ================== USER ==================

@app.post("/users/")
def create_user(nickname: str, db: Session = Depends(get_db)):
    return crud.create_user(db, nickname)

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user(db, user_id)

@app.get("/users/by-nickname/{nickname}")
def get_user_by_nickname(nickname: str, db: Session = Depends(get_db)):
    return crud.get_user_by_nickname(db, nickname)

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud.delete_user(db, user_id)

# ================== TRACKS ==================

@app.post("/tracks/")
def create_track(title: str, artist_name: str, db: Session = Depends(get_db)):
    return crud.create_track(db, title, artist_name)

@app.get("/tracks/")
def get_tracks(db: Session = Depends(get_db)):
    return crud.get_tracks(db)

@app.get("/tracks/{track_id}")
def get_track(track_id: int, db: Session = Depends(get_db)):
    return crud.get_track(db, track_id)

@app.put("/tracks/{track_id}")
def update_track(track_id: int, title: Optional[str] = None, artist_name: Optional[str] = None, db: Session = Depends(get_db)):
    return crud.update_track(db, track_id, title, artist_name)

@app.delete("/tracks/{track_id}")
def delete_track(track_id: int, db: Session = Depends(get_db)):
    return crud.delete_track(db, track_id)

# ================== MISSIONS ==================

@app.post("/missions/")
def create_mission(track_id: int, title: str, points: int, db: Session = Depends(get_db)):
    return crud.create_mission(db, track_id, title, points)

@app.get("/missions/")
def get_missions(db: Session = Depends(get_db)):
    return crud.get_missions(db)

@app.get("/missions/{mission_id}")
def get_mission(mission_id: int, db: Session = Depends(get_db)):
    return crud.get_mission(db, mission_id)

@app.get("/missions/by-track/{track_id}")
def get_missions_by_track_id(track_id: int, db: Session = Depends(get_db)):
    return crud.get_missions_by_track_id(db, track_id)

@app.put("/missions/{mission_id}")
def update_mission(mission_id: int, title: Optional[str] = None, points: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.update_mission(db, mission_id, title, points)

@app.delete("/missions/{mission_id}")
def delete_mission(mission_id: int, db: Session = Depends(get_db)):
    return crud.delete_mission(db, mission_id)

# ================== COMPLETED MISSIONS ==================

@app.post("/completed-missions/")
def complete_mission(user_id: int, mission_id: int, db: Session = Depends(get_db)):
    return crud.complete_mission(db, user_id, mission_id)

@app.get("/completed-missions/")
def get_completed_missions(db: Session = Depends(get_db)):
    return crud.get_completed_missions(db)

@app.get("/completed-missions/{completed_id}")
def get_completed_mission(completed_id: int, db: Session = Depends(get_db)):
    return crud.get_completed_mission(db, completed_id)

@app.get("/completed-missions/by-user/{user_id}")
def get_completed_missions_by_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_completed_missions_by_user(db, user_id)

@app.delete("/completed-missions/{completed_id}")
def delete_completed_mission(completed_id: int, db: Session = Depends(get_db)):
    return crud.delete_completed_mission(db, completed_id)

# ================== LEADERBOARD ==================

@app.get("/user-points/{user_id}")
def get_user_points(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_points(db, user_id)

@app.get("/leaderboard/")
def get_leaderboard(db: Session = Depends(get_db)):
    return crud.get_leaderboard(db)