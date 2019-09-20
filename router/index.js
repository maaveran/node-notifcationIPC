const  express =  require('express')
const  classes  =  require('../workerCluster')
const router  = express.Router()

const setRouter  = (app) => {
    router.get('/status',(req,res)=>res.send({ status  : 200}))
}

module.exports = setRouter