import express from "express";
import morgan from 'morgan';
import bodyParser from 'body-parser'
import appRouter from "./routers.mjs"
import config from "./config.mjs"
import loggingStream from './logging.mjs'

const app = express();

app.set('view engine','ejs');
app.set('views', './app/views')

//Determinar si se deberá imprimir o no los log de peticiones al servidor
let logging_stream = ''
if (config.logging.print_logging){
    logging_stream = loggingStream;
    
}

//Middleware logger
if (config.node_environment === 'development'){
    app.use(morgan('combined',{stream:logging_stream}));
}
else{
    app.use(morgan('dev',{stream:logging_stream}));
}


//Middleware minimalista que actua como logger de las peticiones, se desactiva pues se usa morgan
//middleware para hacer seguimiento de las peticiones al servidor
/*
app.use((req,res, next)=>{
    var datetime = new Date();
    console.log(`method: ${req.method} / ${res.statusCode} | url: ${req.url} | time: ${datetime}`);
    next();
});
*/
//
//middleware que recibe los body de las peticiones entrantes antes que los handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//ENRUTADO PRINCIPAL
app.use("/",appRouter);

// middleware para atrapar todas las peticiones no establecidas como 404
app.use((req, res, next) => {
    const error = new Error('Endpoint not found.');
    error.status = 404;
    console.log("error 404")
    next(error);
});

// Manejador de errores general
app.use((error, req, res, next) =>
    res.status(error.status || 500).json({
        message: error.message,
        error: config.node_environment === 'development' ? error : {},
        title: 'Error',
    })
);

export default app;

