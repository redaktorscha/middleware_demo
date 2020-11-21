const [{
    Server: h1
}, x] = [require('http'), require('express')]; //modules http & express

const apiRouter = require('./routes/api'); //link to dir cause index.js
const apiRouter2 = require('./routes/api2');

const Router = x.Router();
const PORT = 4321;
const serverError = (e, r, rs, n) => rs.status(500).set(hu).send(`Internal server error: ${rs.statusCode}`);
const {
    log
} = console;

//const mw0 = (r, rs, n) => rs.status(200).set(hu) && n();

const hu = {
    'Content-Type': 'text/html; charset=utf-8'
}; //headers
const app = x();
Router
    .route('/')
    .get((req, res) => res.end('Привет мир!')); //r => r.res.end('Привет мир!')
app
    .use((r, rs, n) => rs.status(200).set(hu) && n())
    .use(workingSetter = (req, res, next) => {
        req.working = 'WOW! it works';
        next()
    }) // sets custom req prop; without next() will be 'pending' 
    .use(x.static('.'))
    .use('/', Router)
    .use('/api', apiRouter(x))
    .use('/api2', apiRouter2(x))
    .get('/first', (req, res, next) => {
        if (req.query.error === 'yes') { //query: ?error=yes, next = next middlware func in stack, next arg == 'custom err'
            return next('internal server err');// next() => error 404 str 29; next('custom err') => error 500 str 30
            //return next();
        }
        //req.app._router.stack.forEach(middleware => console.log(middleware.name)) //working middlewares
        //res.send('Ok! it works!');
        res.send(req.working);
    })
    //.use((req, res) =>  res.send('fin')) //will ne next() for return next() in .get('first' => next()) instead of finalhandler
    // .use((req, res, next) => {
    //     res.errorMsg = 'ohhhhh';
    //     next();
    // })
    .use((req, res) => res.status(404).set(hu).send('oh no')) //user error: not found
    .use(serverError) //server error //.use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`)) 
    /* .set('view engine', 'pug') */
    .set('x-powered-by', false);
module.exports = h1(app)
    .listen(process.env.PORT || PORT, () => log(process.pid)); //lsof -i tcp:4321



/*
    app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); */

/*

для варианта с type="module"

import { Server } from 'http';
import x from 'express';

и в предпоследней строке

export default Server(app)

*/