import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';


dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.status(200).json({
      success: "true",
      message: 'Welcome to stackoverflow-clone'
    });
  });

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the database');    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(port, () => {
    console.log('Server is listening on port 3000');
});

export default app;
