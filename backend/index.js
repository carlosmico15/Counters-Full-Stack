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

app.get( '/addCounter/:count', ( req, res ) => {
    console.log(req.params)
    count=req.params.count
    new CounterModel( {
        count:count,
    } ).save().then( counter => res.send( { counter, "info": "Counter successfully created" } ) )
} )

app.listen( 3001 )
