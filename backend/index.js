const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );// importo mongoose como ODM 
const CounterModel = require( './models/counter' );//importo modelo mongoose counter
//conexión a la base de datos MongoDB CounterDB
mongoose.connect( 'mongodb://localhost:27017/CounterDB', { useCreateIndex: true, useNewUrlParser: true } )
    .then( () => console.log( "conexión establecida con éxito" ) )
    .catch( err => console.log( "error al intentar conectar con mongodb " + err ) )

app.use( function ( req, res, next ) {// para prevenir el cors error
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.header( 'Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH' );
    next();
} );
app.get( '/all', ( req, res ) => {
    CounterModel.find({}).then(counters=>res.send(counters))
    .catch(err=>res.status(500).send(err))
})


app.get( '/addCounter/:count', ( req, res ) => {
    count=req.params.count;
    new CounterModel( {
        count,
    } ).save()
    .then( counter => res.status(201).send(  counter ) )
    .catch(err=>res.status(500).send(err));
} );

app.get('/increment/:id',(req,res)=>{
    CounterModel.findById(req.params.id).then(counter=>{
        counter.count=counter.count+1
        CounterModel.findByIdAndUpdate(counter._id,{count:counter.count},{new:true,useFindAndModify:false})
        .then(counter=>res.status(200).send(counter))
    })
    .catch(console.log)
})

//TODO ADD DECREMENT ENDPOINT 

app.listen( 3001 )
