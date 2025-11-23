# Obstacles Village - Sistema di Prenotazione

Applicazione React per la gestione delle prenotazioni degli allenamenti all'Obstacles Village.

## Branch v3

Questo branch mantiene la retrocompatibilità con Firebase e aggiunge un pannello amministratore per gestire gli allenamenti.

## Struttura del Progetto

- **Frontend**: React app (porta 3000)
- **Backend**: Firebase Firestore

## Installazione

```bash
npm install
```

## Avvio del Progetto

```bash
npm start
```

L'applicazione si avvia su `http://localhost:3000`

## Funzionalità

### Utenti
- **Home**: Pagina principale con link alle varie sezioni
- **La settimana**: Visualizzazione dei giorni della settimana con prenotazioni
- **Gli allenamenti**: Descrizione dei vari tipi di allenamento
- **Prenotazione**: Iscrizione agli allenamenti

### Amministratore
- **Admin** (`/admin`): Pannello amministratore per gestire gli allenamenti
  - Visualizza giorni della settimana
  - Crea nuovi allenamenti
  - Modifica allenamenti esistenti (descrizione, orario, ordine)
  - Elimina allenamenti
  - Visualizza numero iscritti per ogni allenamento

## Struttura Firebase

### Collezione `workout-week`
```
workout-week/
  {dayId}/
    day: "Lunedì"
    order: 0
    url: "lunedi"
    workouts/
      {workoutId}/
        description: "OCR Training"
        time: "18:00 - 19:30"
        order: 0
        users: ["Mario", "Luigi"]
```

### Collezione `week` (vecchia, per compatibilità)
```
week/
  {dayId}/
    day: "Lunedì"
    type: "Allenamento"
    order: 0
    users: ["Mario", "Luigi"]
```

## Inizializzazione Dati Firebase

Se il database è vuoto, puoi creare i giorni della settimana manualmente su Firebase Console o usando questo script:

### Giorni della settimana da creare:
```javascript
// Collezione: workout-week
{
  "lunedi": {
    day: "Lunedì",
    order: 0,
    url: "lunedi"
  },
  "martedi": {
    day: "Martedì",
    order: 1,
    url: "martedi"
  },
  "mercoledi": {
    day: "Mercoledì",
    order: 2,
    url: "mercoledi"
  },
  "giovedi": {
    day: "Giovedì",
    order: 3,
    url: "giovedi"
  },
  "venerdi": {
    day: "Venerdì",
    order: 4,
    url: "venerdi"
  },
  "sabato": {
    day: "Sabato",
    order: 5,
    url: "sabato"
  },
  "domenica": {
    day: "Domenica",
    order: 6,
    url: "domenica"
  }
}
```

## Note

- Il pannello admin è accessibile direttamente all'URL `/admin`
- Gli allenamenti vengono salvati automaticamente su Firebase
- Per produzione, considera di aggiungere autenticazione per proteggere `/admin`
