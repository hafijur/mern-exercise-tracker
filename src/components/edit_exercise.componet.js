import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const EditExercise = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const [exercise, setExercise] = useState({});

    useEffect(() => {
        axios.get('/exercises/' + params.id).then(res => {
            setExercise(res.data);
        }).catch(err => console.log("Error : ", err));
    }, []);


    const onSubmit = (id) => {

        axios.post('/exercises/update/' + id, {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }).then(res => {
            navigate('/')
        }).catch(err => console.log("Exercise add error :", err));

    }
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setExercise({ ...exercise, [name]: value });
    }
    return (
        <div>
            <form>
                <div className="form-group mt-3">
                    <label>Username</label>
                    {/* <select on className='form-control' id="cars" name='username'>
                        {exercise.users.map((user, i) => <option key={i} value={user}>{user}</option>)}
                    </select> */}
                    <input disabled type="text" onChange={handleChanges} className="form-control" name='username' value={exercise.username} placeholder="Enter Username" />
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input type="text" onChange={handleChanges} className="form-control" name='description' value={exercise.description} placeholder="Enter Description" />
                </div>

                <div className="form-group mt-3">
                    <label>Duration</label>
                    <input type="number" onChange={handleChanges} className="form-control" name='duration' value={exercise.duration} placeholder="Enter duration" />
                </div>

                <div className="form-group mt-3">
                    <label>Date</label>
                    <input type="date" onChange={handleChanges} className="form-control" name='date' value={new Date(exercise.date).toLocaleDateString('en-CA')} />
                </div>

                <input onClick={() => onSubmit(exercise._id)} type='button' className='btn btn-success mt-3' value='Submit' />

            </form >
        </div>
    );
};

export default EditExercise;