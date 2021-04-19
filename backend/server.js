
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 27017;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  
  console.log("MongoDB database connection established successfully");
})

const bisectionRouter = require('./routes/bisection');
const falseRouter = require('./routes/false');
const newtonRouter = require('./routes/newton');
const onepointRouter = require('./routes/onepoint');
const secantRouter = require('./routes/secant');


app.use('/bisection', bisectionRouter);
app.use('/false', falseRouter);
app.use('/onepoint', onepointRouter);
app.use('/newton', newtonRouter);
app.use('/secant', secantRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});