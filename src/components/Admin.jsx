import React, { useEffect, useState } from 'react';
import { db } from "../index";
import { Button, Form, Modal, Table } from "react-bootstrap";
import swal from 'sweetalert';
import './Admin.css';

export default function Admin() {
    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        time: '',
        order: 0
    });

    // Carica i giorni della settimana
    const loadDays = () => {
        db.collection("workout-week")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDays(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
            })
            .catch(error => {
                console.error("Error loading days:", error);
                swal("Errore", "Impossibile caricare i giorni", "error");
            });
    };

    // Carica gli allenamenti per un giorno specifico
    const loadWorkouts = (dayId) => {
        if (!dayId) return;
        
        db.collection("workout-week").doc(dayId).collection("workouts")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    doc: doc.id,
                    ...doc.data()
                }));
                setWorkouts(data.sort((a, b) => (a.order || 0) - (b.order || 0)));
            })
            .catch(error => {
                console.error("Error loading workouts:", error);
                swal("Errore", "Impossibile caricare gli allenamenti", "error");
            });
    };

    useEffect(() => {
        loadDays();
    }, []);

    useEffect(() => {
        if (selectedDay) {
            loadWorkouts(selectedDay.id);
        }
    }, [selectedDay]);

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setWorkouts([]);
    };

    const handleOpenModal = (workout = null) => {
        if (workout) {
            setEditingWorkout(workout);
            setFormData({
                description: workout.description || '',
                time: workout.time || '',
                order: workout.order || 0
            });
        } else {
            setEditingWorkout(null);
            setFormData({
                description: '',
                time: '',
                order: workouts.length > 0 ? Math.max(...workouts.map(w => w.order || 0)) + 1 : 0
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingWorkout(null);
        setFormData({
            description: '',
            time: '',
            order: 0
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 0 : value
        }));
    };

    const handleSave = async () => {
        if (!formData.description || !formData.time) {
            swal("Errore", "Compila tutti i campi obbligatori", "error");
            return;
        }

        try {
            if (editingWorkout) {
                // Aggiorna allenamento esistente
                await db.collection("workout-week")
                    .doc(selectedDay.id)
                    .collection("workouts")
                    .doc(editingWorkout.doc)
                    .update({
                        description: formData.description,
                        time: formData.time,
                        order: formData.order
                    });
                swal("Successo", "Allenamento aggiornato con successo", "success");
            } else {
                // Crea nuovo allenamento
                await db.collection("workout-week")
                    .doc(selectedDay.id)
                    .collection("workouts")
                    .add({
                        description: formData.description,
                        time: formData.time,
                        order: formData.order,
                        users: []
                    });
                swal("Successo", "Allenamento creato con successo", "success");
            }
            handleCloseModal();
            loadWorkouts(selectedDay.id);
        } catch (error) {
            console.error("Error saving workout:", error);
            swal("Errore", "Impossibile salvare l'allenamento", "error");
        }
    };

    const handleDelete = async (workout) => {
        const confirm = await swal({
            title: "Sei sicuro?",
            text: "Vuoi eliminare questo allenamento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (confirm) {
            try {
                await db.collection("workout-week")
                    .doc(selectedDay.id)
                    .collection("workouts")
                    .doc(workout.doc)
                    .delete();
                swal("Successo", "Allenamento eliminato con successo", "success");
                loadWorkouts(selectedDay.id);
            } catch (error) {
                console.error("Error deleting workout:", error);
                swal("Errore", "Impossibile eliminare l'allenamento", "error");
            }
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Pannello Amministratore - Gestione Allenamenti</h2>
            
            <div className="admin-content">
                <div className="admin-sidebar">
                    <h4>Giorni della settimana</h4>
                    <div className="day-list">
                        {days.map(day => (
                            <div
                                key={day.id}
                                className={`day-item ${selectedDay?.id === day.id ? 'active' : ''}`}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day.day}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-main">
                    {selectedDay ? (
                        <>
                            <div className="admin-header">
                                <h3>Allenamenti per {selectedDay.day}</h3>
                                <Button variant="primary" onClick={() => handleOpenModal()}>
                                    + Aggiungi Allenamento
                                </Button>
                            </div>

                            {workouts.length > 0 ? (
                                <Table striped bordered hover className="workout-table">
                                    <thead>
                                        <tr>
                                            <th>Ordine</th>
                                            <th>Descrizione</th>
                                            <th>Orario</th>
                                            <th>Iscritti</th>
                                            <th>Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {workouts.map(workout => (
                                            <tr key={workout.doc}>
                                                <td>{workout.order}</td>
                                                <td>{workout.description}</td>
                                                <td>{workout.time}</td>
                                                <td>{workout.users ? workout.users.length : 0}</td>
                                                <td>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        onClick={() => handleOpenModal(workout)}
                                                        style={{ marginRight: '10px' }}
                                                    >
                                                        Modifica
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(workout)}
                                                    >
                                                        Elimina
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="no-workouts">
                                    <p>Nessun allenamento per questo giorno.</p>
                                    <Button variant="primary" onClick={() => handleOpenModal()}>
                                        Crea il primo allenamento
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-selection">
                            <p>Seleziona un giorno dalla lista per gestire gli allenamenti</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal per creare/modificare allenamento */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editingWorkout ? 'Modifica Allenamento' : 'Nuovo Allenamento'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descrizione *</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Es: OCR Training"
                            />
                        </Form.Group>

                        <Form.Group controlId="formTime">
                            <Form.Label>Orario *</Form.Label>
                            <Form.Control
                                type="text"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                placeholder="Es: 18:00 - 19:30"
                            />
                        </Form.Group>

                        <Form.Group controlId="formOrder">
                            <Form.Label>Ordine</Form.Label>
                            <Form.Control
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleInputChange}
                                min="0"
                            />
                            <Form.Text className="text-muted">
                                Numero per ordinare gli allenamenti (più basso = prima)
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

