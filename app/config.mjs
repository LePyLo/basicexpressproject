import dotenv from 'dotenv'
dotenv.config();

const configuration = {
    node_environment: process.env.NODE_ENV || 'development',
    server: {
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || 3000,
    },
    database: {
        db_name: process.env.DATABASE_NAME,
        db_username:process.env.DATABASE_USERNAME,
        db_password:process.env.DATABASE_PASSWORD,
        db_port:process.env.DATABASE_PORT,
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