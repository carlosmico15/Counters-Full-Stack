const express = require('express');
const app = express();
const mongoose = require('mongoose'); // importo mongoose como ODM 
const CounterModel = require('./models/counter'); //importo modelo mongoose counter

//conexión a la base de datos MongoDB CounterDB (Si no encuentra la Base de Datos la crea el solo)
mongoose.connect('mongodb://localhost:27017/CounterDB', { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log("conexión establecida con éxito"))
    .catch(err => console.log("error al intentar conectar con mongodb " + err))

app.use(function(req, res, next) { // para prevenir el cors error
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
    next();
});

//Endpoint que devuelve todos los counters de la BD
app.get('/all', (req, res) => {
    CounterModel.find({}).then(counters => res.send(counters))
        .catch(err => res.status(500).send(err))
})

//Endpoint que añade un nuevo counter de la BD
app.get('/addCounter/:count', (req, res) => {
    count = req.params.count;
    new CounterModel({
            count,
        }).save()
        .then(counter => res.status(201).send(counter))
        .catch(err => res.status(500).send(err));
});

//Endpoint que incrementa el counter con el ID recibido por parametro de la URL
app.get('/increment/:id', (req, res) => {
    CounterModel.findById(req.params.id).then(counter => {
            counter.count = counter.count + 1
            CounterModel.findByIdAndUpdate(counter._id, { count: counter.count }, { new: true, useFindAndModify: false })
                .then(counter => res.status(200).send(counter))
        })
        .catch(console.log)
})

//Endpoint que decrementa el counter con el ID recibido por parametro de la URL
app.get('/decrement/:id', (req, res) => {
    CounterModel.findById(req.params.id).then(counter => {
            counter.count = counter.count - 1
            CounterModel.findByIdAndUpdate(counter._id, { count: counter.count }, { new: true, useFindAndModify: false })
                .then(counter => res.status(200).send(counter))
        })
        .catch(console.log)
})

//Endpoint que elimina el counter con el ID recibido por parametro de la URL
app.get("/remove/:id", (req, res) => {
    CounterModel.findByIdAndRemove(req.params.id).then((counter) => res.status(200).send({ "info": `Counter removed succesfully!`, counter })).catch();
});

//TODO ADD DECREMENT ENDPOINT 

app.listen(3001)