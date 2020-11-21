/**
 * exports express router instance
 * @param { Object } x - express
 */
module.exports = x => {
   const router =  x.Router();

   router
   .route('/') //host/api/
   .get(r => r.res.send('Do maths: add, mpy'))

   router
   .route('/add/:n1/:n2') //parametrized route
   .get(r => r.res.send('Got: ' + (Number(r.params.n1) + Number(r.params.n2))))
   .post(r => r.res.send('POSTED: ' + (Number(r.params.n1) + Number(r.params.n2))))

   router
   .route('/mpy/:n1/:n2') //parametrized route
   .get(r => r.res.send('Got: ' + (Number(r.params.n1) * Number(r.params.n2))))
   .post(r => r.res.send('POSTED: ' + (Number(r.params.n1) * Number(r.params.n2))))

   return router;
}