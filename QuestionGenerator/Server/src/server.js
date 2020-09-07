const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://teste-lyncas:teste-lyncas@cluster0.jlmdd.mongodb.net/teste-lyncas?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const server = app.listen(3333);
 
module.exports = server;