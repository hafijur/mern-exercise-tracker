import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('/users').then(res => setUsers(res.data)).catch(err => console.log("Users error : ", err));
    });

    return (
        <div>
            <ol className='list-group'>
                {users.map((user, i) => <li className='list-group-item' key={i}>{user.username}</li>)}
            </ol>
        </div>
    );
};

export default UserList;