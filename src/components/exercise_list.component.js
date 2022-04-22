import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExerciseList = () => {
    const [exercises, setExercises] = useState([{}]);
    useEffect(() => {
        axios.get('/exercises').then(res => {
            if (res.data.length > 0) {
                setExercises(res.data.map(item => item));
                console.log(res.data);
            }
        }).catch(err => console.log("Found Issues : ", err));
    }, []);

    const removeExercise = (id) => {
        axios.delete('/exercises/' + id).then(res => {
            console.log(res.data);
            setExercises(exercises.filter(item => item._id != id));

        }).catch(err => console.log("Error ", err));
    }
    return (
        <div>
            <h3>Logged Exercise</h3>
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((item, index) =>

                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.description}</td>
                            <td>{item.duration}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>
                                <Link className='btn btn-success' to={'/edit/' + item._id}>Edit</Link>
                                <input type='button' onClick={() => removeExercise(item._id)} className='btn btn-danger' value='Delete' />
                            </td>

                        </tr>


                    )}

                </tbody>
            </table>

        </div>
    );
};

export default ExerciseList;