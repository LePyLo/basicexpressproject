import dotenv from 'dotenv'
dotenv.config();

const configuration = {
    node_environment: process.env.NODE_ENV || 'development',
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || 3000,
    },
    database: {
        db_type:process.env.DATABASE_TYPE || 'mysql',
        db_name: process.env.DATABASE_NAME || 'db',
        db_username:process.env.DATABASE_USERNAME || 'root',
        db_password:process.env.DATABASE_PASSWORD || '',
        db_port:process.env.DATABASE_PORT || 3306,
        db_host:process.env.DATABASE_HOST || 'localhost',
        db_pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000,
        }
    },
    logging:{
        print_logging:true,
        logging_structure:'',
        file_size:'10M',
        logging_filename:'access_history.log',
        rotation_interval:'1d',
        logging_folder:'log',
        compress_type:'gzip',
    }
}

export default configuration;