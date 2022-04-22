import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/users/add', { username: username }).then(res => console.log("Response ", res.data));
        console.log("Username : ", username);
        navigate('/user');
    }

    return (
        <div>
            <form>
                <div className="form-group mt-3">
                    <h3>Create New User</h3>
                    <label>Username</label>
                    <input required type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" name='username' placeholder="Enter Username" />
                </div>
                <input onClick={onSubmit} type='button' className='btn btn-success mt-3' value='Submit' />
            </form >
        </div>
    );
};

export default CreateUser;