const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
require('dotenv').config();
const Pusher = require('pusher');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

const pusher = new Pusher({

    appId: '928318',
    key: 'ff6e8b5bae84541857cb',
    secret: 'b76001b3f4edb82d9927',
    cluster: 'eu',
    encrypted: true

});

const channel = 'banters';

const port = process.env.PORT || 4000;

const uri = config.get('ATLAS_URI');
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDb connection established successfully");

    const banterCollection = connection.collection('banters');
    const changeStream = banterCollection.watch();

    changeStream.on('change', (change) => {
    console.log(change);

    if(change.operationType == 'insert') {
        pusher.trigger(
            channel,
            'inserted',
            change.fullDocument
        );
    } else if (change.operationType == 'update') {
        pusher.trigger(
            channel,
            'updated',
            change.fullDocument
        );
    } else if (change.operationType == 'delete') {
        pusher.trigger(
            channel,
            'deleted',
            change.documentKey._id
        );
    }
    
});
});


const userRoutes = require('./Routes/users');
const banterRoutes = require('./Routes/banter');

app.use('/users', userRoutes);
app.use('/banters', banterRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


