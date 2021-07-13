//configurar la aplicación
import express from 'express';
import morgan from 'morgan';
import cors from'cors';
import router from './routes/index.js';
import {createRoles} from './reuse/initialSetUp';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import engine from 'ejs-mate';
import path from 'path';
import './middlewares/authSession';

const app= express()
createRoles()

//settings

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.json())
app.use(cookieParser('my secret'));
app.use(session({
    secret: 'my top Secret',
    resave: false,
    saveUninitialized: false
}))

// app.use(passport.initialize());
// app.use(passport.session());

//routers
app.use('/', router);



module.exports = app;
