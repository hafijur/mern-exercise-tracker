import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise_list.component";
import EditExercise from "./components/edit_exercise.componet";
import CreateExercise from "./components/create_exercise.component";
import CreateUser from "./components/create_user.component";
import NotFound from "./components/404.component";
import UserList from "./components/user_list.component";
import axios from "axios";



function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return (

    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/add" element={<CreateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
