import express, { Router } from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import korisnikRuta from './rute/korisnikRuta';
import proizvodRuta from './rute/proizvodRuta';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/korisnici', korisnikRuta);
app.use('/api/proizvodi', proizvodRuta);

app.listen(5000, () => {console.log("Server running at http://localhost:5000")})

