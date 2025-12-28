from database.db import Base, engine
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint, Index

# ================== USERS ==================

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)  # chiave primaria, indicizzata per lookup rapido
    nickname = Column(String, unique=True, index=True)  # nickname unico e indicizzato per ricerche veloci

    # relazione 1:N con le missioni completate dall’utente
    completed_missions = relationship(
        "CompletedMission",
        back_populates="user",
        cascade="all, delete-orphan"
    )

# ================== TRACKS ==================

class Track(Base):
    __tablename__ = "tracks"
    id = Column(Integer, primary_key=True, index=True)  # chiave primaria della traccia
    title = Column(String, index=True, nullable=False)  # titolo indicizzato per ricerche rapide
    artist_name = Column(String, index=True, nullable=False)  # artista indicizzato per filtri frequenti

    # relazione 1:N con le missioni associate alla traccia
    missions = relationship(
        "Mission",
        back_populates="track",
        cascade="all, delete-orphan"
    )

    # garantisce che non esistano due tracce con stesso titolo e artista
    __table_args__ = (
        UniqueConstraint('title', 'artist_name', name='uq_track_title_artist'),
    )

# ================== MISSIONS ==================

class Mission(Base):
    __tablename__ = "missions"
    id = Column(Integer, primary_key=True, index=True)  # chiave primaria della missione
    track_id = Column(Integer, ForeignKey("tracks.id"), index=True, nullable=False)  # FK verso Track
    title = Column(String, index=True)  # titolo missione indicizzato per lookup
    points = Column(Integer, index=True)  # punti assegnati dalla missione

    # relazione N:1 con la traccia di appartenenza
    track = relationship(
        "Track",
        back_populates="missions"
    )

    # relazione 1:N con le istanze di missioni completate
    completed_missions = relationship(
        "CompletedMission",
        back_populates="mission",
        cascade="all, delete-orphan"
    )

    # impedisce missioni duplicate con stesso titolo nella stessa traccia
    __table_args__ = (
        UniqueConstraint('track_id', 'title', name='uq_mission_track_title'),
    )

# ================== COMPLETED MISSIONS ==================

class CompletedMission(Base):
    __tablename__ = "completed_missions"
    id = Column(Integer, primary_key=True, index=True)  # identificativo della completion
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)  # FK verso User
    mission_id = Column(Integer, ForeignKey("missions.id"), index=True, nullable=False)  # FK verso Mission
    completed_at = Column(DateTime, index=True)  # timestamp di completamento

    # relazione N:1 con l’utente che ha completato la missione
    user = relationship(
        "User",
        back_populates="completed_missions",
        passive_deletes=True
    )

    # relazione N:1 con la missione completata
    mission = relationship(
        "Mission",
        back_populates="completed_missions",
        passive_deletes=True
    )

    # evita che un utente completi la stessa missione più volte
    __table_args__ = (
        UniqueConstraint('user_id', 'mission_id', name='uq_user_mission'),
    )

Base.metadata.create_all(bind=engine)