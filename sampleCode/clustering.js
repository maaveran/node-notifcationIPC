'use strict';
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster){
    console.log('Master process is running with pid  :',process.pid);

    const  ClusterMap = {}
    let    count = 0;
    
    for(let  i  = 0; i < numCPUs; i++){
        const  customId = i + 100;
        const  worker   = cluster.fork({ workerId : customId })
        
        //cluster 
        ClusterMap[worker.id] = customId;
        console.log(ClusterMap)

        worker.send({ msg : 'hello from master'})

        worker.on('message', msg => {
            console.log('Message from worker', ClusterMap[worker.id])
        })

        if(ClusterMap[worker.id]  === 101 &&  !count++ ){
            const taskArg = { params : {
                name :  'xyz'
            },task : 'email'}

            worker.send(taskArg)
        }else{
            switch(msg.msgType){
                case 'EMAIL':
                    console.log('Action to perform is EMAIL')
                    break;
                default:
                    break;
            }
        }
        
    }
}else{
    console.log(`worker start with pid :`,
        process.pid,
        ' and id: ',
        process.env.workerId
    )

    process.on('message', msg =>{
        console.log('Message from master : ', msg)
        process.send({
            msgType : 'EMAIL',
            msg     : 'Hello from  worker'
        })

    })
}