import Sequelize from 'sequelize';
import config from './config.mjs'

const sequelize = new Sequelize(config.database.db_name,config.database.db_username, config.database.db_password,{

        host:config.database.db_host,
        port: config.database.db_port,
        dialect:config.database.db_type,
        pool:{
            max:config.database.db_pool.max,
            min:config.database.db_pool.min,
            acquire:config.database.db_pool.acquire,
            idle:config.database.db_pool.idle,
        },
    })

const db={
    Sequelize:Sequelize,
    db_conn:sequelize,
}

export default db;