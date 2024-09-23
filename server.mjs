import app from './app/app.mjs';
import config from "./app/config.mjs";

app.listen(config.server.port,()=>{
    const currentDate = new Date();
    console.log(`Entorno: \x1b[42m${config.node_environment}\x1b[0m`)
    console.log(`Hora de inicio: ${currentDate}`)
    console.log(`Servidor iniciado en \x1b[34mhttp://${config.server.host}:${config.server.port}\x1b[0m`);
});