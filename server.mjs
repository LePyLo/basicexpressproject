import app from './app/app.mjs';
import config from "./app/config.mjs";

app.listen(config.server.port,()=>{
    const currentDate = new Date();
    console.log(`Entorno: ${config.node_environment}`)
    console.log(`Hora de inicio: ${currentDate}`)
    console.log(`Servidor iniciado en http://${config.server.host}:${config.server.port}`);
});