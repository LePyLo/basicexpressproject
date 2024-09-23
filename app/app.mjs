import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import appRouter from "./routers.mjs";
import config from "./config.mjs";
import loggingStream from './logging.mjs';

const app = express();

app.set('view engine','ejs');
app.set('views', './app/views')

//Determinar si se deberá imprimir o no los log de peticiones al servidor
let logging_stream = ''
if (config.logging.print_logging){
    logging_stream = loggingStream;
    
}

//Middleware logger morgan
if (config.node_environment === 'production'){
    app.use(morgan('combined',{stream:logging_stream}));
}
else{
    app.use(morgan('dev',{stream:logging_stream}));
}

//Middleware minimalista que actua como logger de las peticiones, se desactiva pues se usa morgan
//middleware para hacer seguimiento de las peticiones al servidor
app.use((req,res, next)=>{
    var datetime = new Date();
    console.log(`metodo: \x1b[33m${req.method} / ${res.statusCode} \x1b[0m| url: \x1b[35m${req.url}\x1b[0m | tiempo: ${datetime}`);
    next();
});

//middleware para el manejo de ataques
app.use(helmet());

//cors
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//comprime peticiones json y archivos estaticos
app.use(compression());

//middleware que recibe los body de las peticiones entrantes antes que los handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static files
app.use('/static',express.static('public'));

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

