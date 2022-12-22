const express = require('express')
require("dotenv").config();
const app = express()
var morgan = require('morgan')
var cors = require('cors')
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");
const http = require("http");
const path = require('path');
var session = require("express-session");
const cookieParser = require("cookie-parser");
var MemoryStore = require("connect-mongo");


//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("random"));

const server = http.createServer(app);

// db
require("./src/db/conn");

const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");

console.log(template_path)

app.use(express.static(static_path));
//! set Template engine

app.set("view engine", "hbs");
app.set("views", template_path);


app.use(cookieParser("random"));


app.use(
    session({
        name: "session-id",
        secret: "random",
        saveUninitialized: true,
        resave: true,
        store: MemoryStore.create({
            mongoUrl: process.env.DATABASE,
            collection: "sessions",
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);


// global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// routes
app.use(require("./src/routes/routes"));


// catch 404 and forward to error handler
app.get('*', (req, res, next) => {
    res.status(404).render('404');
})

server.listen(PORT, () => {
    console.log(`connection successful at port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

