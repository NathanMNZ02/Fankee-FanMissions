from datetime import datetime
from sqlalchemy.orm import Session
from database.db import engine
from database.models import Base, User, Track, Mission

Base.metadata.create_all(bind=engine)

USERS = [
    {"nickname": "Alice"},
    {"nickname": "Bob"},
    {"nickname": "Charlie"},
]

TRACKS = [
    {
        "title": "Firestarter",
        "artist_name": "Rico Blaze",
        "missions": [
            {"title": "Metti like alla cover ufficiale", "points": 5},
            {"title": "Registra un mini-video usando il ritornello", "points": 25},
            {"title": "Condividi il ritornello taggando l'artista", "points": 20},
        ],
    },
    {
        "title": "Ocean Drive",
        "artist_name": "Nina Flow",
        "missions": [
            {"title": "Condividi una foto vibe 'ocean'", "points": 30},
            {"title": "Rispondi alla domanda sul testo", "points": 15},
            {"title": "Aggiungi Ocean Drive alla tua playlist", "points": 10},
        ],
    },
    {
        "title": "Midnight Echoes",
        "artist_name": "Luna Waves",
        "missions": [
            {"title": "Ascolta Midnight Echoes", "points": 10},
            {"title": "Condividi la cover della traccia su IG", "points": 10},
            {"title": "Scrivi un commento sul mood del ritornello", "points": 15},
        ],
    },
]

def seed_database():
    session = Session(bind=engine)

    for u in USERS:
        user = session.query(User).filter_by(nickname=u["nickname"]).first()
        if not user:
            user = User(nickname=u["nickname"])
            session.add(user)

    for t in TRACKS:
        track = session.query(Track).filter_by(title=t["title"], artist_name=t["artist_name"]).first()
        if not track:
            track = Track(title=t["title"], artist_name=t["artist_name"])
            session.add(track)
            session.flush()  
        for m in t["missions"]:
            mission = session.query(Mission).filter_by(track_id=track.id, title=m["title"]).first()
            if not mission:
                mission = Mission(track_id=track.id, title=m["title"], points=m["points"])
                session.add(mission)

    session.commit()
    session.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()