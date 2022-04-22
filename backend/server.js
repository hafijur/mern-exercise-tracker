const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();


const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }).then(err => console.log(`showing errros mongoose connection: ${err}`));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Mongodb connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);


app.listen(port, () => {

    console.log(`server is runnnin on port ${port}`);

});