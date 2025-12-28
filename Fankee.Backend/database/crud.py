from datetime import datetime
from sqlalchemy import func
from sqlalchemy.orm import Session
from database.models import User, Track, Mission, CompletedMission
from fastapi import HTTPException

# ================== USER ==================

def create_user(db: Session, nickname: str):
    user = User(nickname=nickname)
    db.add(user)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="Nickname already exists")
    db.refresh(user)
    return user

def get_users(db: Session):
    return db.query(User).all()

def get_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_user_by_nickname(db: Session, nickname: str):
    user = db.query(User).filter(User.nickname == nickname).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

# ================== TRACK ==================

def create_track(db: Session, title: str, artist_name: str):
    track = Track(title=title, artist_name=artist_name)
    db.add(track)
    db.commit()
    db.refresh(track)
    return track

def get_tracks(db: Session):
    return db.query(Track).all()

def get_track(db: Session, track_id: int):
    track = db.query(Track).filter(Track.id == track_id).first()
    if not track:
        raise HTTPException(status_code=404, detail="Track not found")
    return track

def update_track(db: Session, track_id: int, title: str = None, artist_name: str = None):
    track = get_track(db, track_id)
    if title is not None:
        track.title = title
    if artist_name is not None:
        track.artist_name = artist_name
    db.commit()
    db.refresh(track)
    return track

def delete_track(db: Session, track_id: int):
    track = get_track(db, track_id)
    db.delete(track)
    db.commit()
    return {"message": "Track deleted"}


# ================== MISSION ==================

def create_mission(db: Session, track_id: int, title: str, points: int):
    _ = get_track(db, track_id)  # Assicura che la track esista (nota che viene lanciata un eccezione in get_track se la traccia non esiste)
    mission = Mission(track_id=track_id, title=title, points=points)
    db.add(mission)
    db.commit()
    db.refresh(mission)
    return mission

def get_missions(db: Session):
    return db.query(Mission).all()

def get_mission(db: Session, mission_id: int):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission

def get_missions_by_track_id(db: Session, track_id: int):
    track = get_track(db, track_id)
    return track.missions

def update_mission(db: Session, mission_id: int, title: str = None, points: int = None):
    mission = get_mission(db, mission_id)
    if title is not None:
        mission.title = title
    if points is not None:
        mission.points = points
    db.commit()
    db.refresh(mission)
    return mission

def delete_mission(db: Session, mission_id: int):
    mission = get_mission(db, mission_id)
    db.delete(mission)
    db.commit()
    return {"message": "Mission deleted"}

# ================== MISSION COMPLETED ==================

def complete_mission(db: Session, user_id: int, mission_id: int):
    _ = get_mission(db, mission_id)
    completed = CompletedMission(user_id = user_id, mission_id = mission_id, completed_at = datetime.now())
    db.add(completed)
    db.commit()
    db.refresh(completed)
    return completed

def get_completed_missions(db: Session):
    return db.query(CompletedMission).all()

def get_completed_mission(db: Session, completed_id: int):
    complted = db.query(CompletedMission).filter(CompletedMission.id == completed_id).first()
    if not complted:
        raise HTTPException(status_code=404, detail="Completed mission not found")
    return complted

def get_completed_missions_by_user(db: Session, user_id: int):
    return db.query(CompletedMission).filter(CompletedMission.user_id == user_id).all()

def delete_completed_mission(db: Session, completed_id: int):
    completed = get_completed_mission(db, completed_id)
    db.delete(completed)
    db.commit()
    db.expunge_all()
    return {"message": "Completed mission deleted"}

# ================== LEADERBOARD ==================

def get_user_points(db: Session, user_id: int) -> int:
    total_points = (
        db.query(func.coalesce(func.sum(Mission.points), 0))
        .join(CompletedMission, CompletedMission.mission_id == Mission.id)
        .filter(CompletedMission.user_id == user_id)
        .scalar()
    )
    return total_points

def get_leaderboard(db: Session):
    results = (
        db.query(
            User.nickname,
            func.coalesce(func.sum(Mission.points), 0).label("points")
        ) # Selezioniamo nickname e somma totale dei punti mettendogli la label points
        .join(CompletedMission, CompletedMission.user_id == User.id) # Effettuiamo la join con le missioni completate dall'utente
        .join(Mission, Mission.id == CompletedMission.mission_id) # Effettuiamo la join con info sulle missioni completate
        .group_by(User.id) # Raggruppiamo per l'id degli utenti
        .order_by(func.sum(Mission.points).desc()) # Ordiniamo in base ai punti in modo decrescente
        .all()
    )

    return [
        {
            "nickname": nickname,
            "points": points
        }
        for nickname, points in results
    ]
        