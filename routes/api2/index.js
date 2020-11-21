/**
 * exports express router instance
 * @param { Object } x - express
 */
module.exports = x => {
    const router =  x.Router();
 
    router
    .route('/') //host/api2/
    .get(r => r.res.send('Not ready'))
   
 
    return router;
 }