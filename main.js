require('dotenv').config();
const express = require('express');
const app = express();
const { logger } = require('./middleware/logger')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger')
const verifyToken = require('./middleware/verifyToken')

const productRoutes = require('./routes/productRoutes')
const cartRoutes = require ('./routes/cartRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const customerOrderRoutes = require('./routes/customerOrderRoutes')
const usersRoutes = require('./routes/usersRoutes')
const userAuthRoutes = require('./routes/userAuthRoutes')

const path = require("path")



connectDB()

app.use(logger)
app.use(cors())

//Products
app.use('/api', productRoutes)
//------------------------------------

//Cart
app.use('/api', cartRoutes)
//------------------------------------

//Customer Order
app.use('/api', customerOrderRoutes)
//-----

//Users
app.use('/api', usersRoutes)
//-----

//Settings
app.use('/api', settingsRoutes)
//------------------------------------

//Users Authorization
app.use('/api', verifyToken, userAuthRoutes)
//-----



//Home
app.use('/home', (req, res) =>{
    res.send('Toy Store API')
})

// app.use((req, res) =>{
//     res.redirect('/home')
// })
//------------------------------------

//Front-End

// app.use(express.static(path.join(__dirname, "./client/dist")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/dist/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.use(express.static(path.join(__dirname, "./client")));

// Catch-all route to serve 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

//------------------------------------

mongoose.connection.once('open',() =>{
    console.log('connected to mongoDB')
    const port = process.env.PORT || 2000;
    app.listen(port, () => console.log(`App is running on port ${port}...`));
})

mongoose.connection.on('error', err => {
    logEvents(`${err.no}\t${err.code}\t${err.syscall}`, 'mongoErrLog.log')
})
