import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const CreateExercise = () => {

    const navigate = useNavigate()
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect(() => {
        axios.get('/users').then(res => {
            console.log(res.data.length);
            if (res.data.length > 0) {
                setExercise((prevState) => ({
                    ...prevState,
                    username: res.data[0].username,
                    users: res.data.map(user => user.username)
                }));
            }
        });
    }, []);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setExercise({ ...exercise, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/exercises/add', {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }).then(res => {
            console.log(res.data);
            navigate('/')
        }).catch(err => console.log("Exercise add error :", err));

    }
    return (
        <div>
            <form>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <select onChange={handleChanges} className='form-control' id="cars" name='username'>
                        {exercise.users.map((user, i) => <option key={i} value={user}>{user}</option>)}
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input type="text" onChange={handleChanges} className="form-control" name='description' placeholder="Enter Description" />
                </div>

                <div className="form-group mt-3">
                    <label>Duration</label>
                    <input type="number" onChange={handleChanges} className="form-control" name='duration' placeholder="Enter duration" />
                </div>

                <div className="form-group mt-3">
                    <label>Date</label>
                    <input type="date" onChange={handleChanges} value={new Date().toLocaleDateString('en-CA')} className="form-control" name='date' />
                </div>

                <input onClick={onSubmit} type='submit' className='btn btn-success mt-3' value='Submit' />

            </form >
        </div>
    );
};

export default CreateExercise;