const express =require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.use('/user', userRoute);

mongoose.
    connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

