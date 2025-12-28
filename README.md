# Fankee-FanMissions

Il progetto nasce come challenge per la startup Fankee allo scopo di creare una web app che disponga di funzionalità come:
- Un utente (fan) sceglie un nickname.
- Il fan può visualizzare un elenco di tracce.
- Per ogni traccia, il fan può visualizzare una o più missioni.
- Il fan può contrassegnare una missione come completata.
- Una classifica mostra quali nickname hanno accumulato più punti.
  
---

## Struttura 

Il progetto è strutturato in due parti:
- Fankee.Backend: backend sviluppato in python + fastapi con database SQLite.
- Fankee.Frontend: frontend sviluppato usando la libreria JavaScript React.


---

## Run

Per avviare correttamente il progetto:

1. Clonare il repository:
    ```bash
    git clone https://github.com/tuo-username/Fankee-FanMissions.git
    cd Fankee-FanMissions
    ```

2. Backend:
    ```bash
    cd Fankee.Backend
    python -m venv env
    source env/bin/activate   # Windows: env\Scripts\activate
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

3. Database seed:
    ```bash
    python seed.py
    ```

4. Frontend:
    ```bash
    cd ../Fankee.Frontend
    npm install
    npm run dev
    ```