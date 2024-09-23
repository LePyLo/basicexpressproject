import Module from "node:module";
const require = Module.createRequire(import.meta.url);
const rfs = require('rotating-file-stream')
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.mjs'

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// create a rotating write stream
var accessLogStream = rfs.createStream(config.logging.logging_filename, {
    size:config.logging.file_size,
    interval: config.logging.rotation_interval,
    compress:config.logging.compress_type,
    path: path.join(__dirname, config.logging.logging_folder),
  })


export default accessLogStream;