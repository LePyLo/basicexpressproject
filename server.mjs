import Sequelize from 'sequelize';
import app from './app/app.mjs';
import config from "./app/config.mjs";
import db from "./app/db.config.mjs";


db.db_conn.authenticate().then(() => {
    console.log(`\x1b[33mConectado correctamente a la base de datos.\x1b[0m`)
 }).catch((error) => {
    console.error(`\x1b[31mOcurrio un error al tratar de conectarse a la base de datos:${error} \x1b[0m`);
 });

app.listen(config.server.port,()=>{
    const currentDate = new Date();
    console.log(`Entorno: \x1b[42m${config.node_environment}\x1b[0m`)
    console.log(`Hora de inicio: ${currentDate}`)
    console.log(`Servidor iniciado en \x1b[34mhttp://${config.server.host}:${config.server.port}\x1b[0m`);
    });
    
