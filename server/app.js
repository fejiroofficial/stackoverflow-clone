import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import dbConfig from './config/config.js';
import router from './routes';


const app = express();
dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.status(200).json({
      success: "true",
      message: "Welcome to stackoverflow-clone"
    });
  });

// app.use('/api/v1', router);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
