import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaRunning } from 'react-icons/fa';
import { GiWeightLiftingDown, GiWeightLiftingUp } from 'react-icons/gi';

function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>  <section class="container-h1">
                <h1 id="h1-home">Exercise <FaRunning/> Tracker</h1>
                <p id="title-desc">Site using MongoDB, Mongoose, REST, React, and Node</p>
            </section>
            <section class="container-h2">
                <h2><GiWeightLiftingDown/> Exercises Log <GiWeightLiftingUp/></h2>
                <p id="log-desc">Select "Add an Exercise" to add a new exercise to the table. After adding an exercise, 
                    click on either the edit or delete icons in the table to edit or remove an exercise.</p>
            </section>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <div>
                <Link to="/add-exercise" class="button">Add an Exercise</Link>
            </div>
        </>
    );
}

export default HomePage;
