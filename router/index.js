const  express               =  require('express')
const  {CreateList}          =  require('../model/workerCluster')
const  router                =  express.Router()


router.get('/status',(req,res)=>{
    res.status(200).send({status : 200})
})
router.route('/list').get(CreateList)


module.exports = router