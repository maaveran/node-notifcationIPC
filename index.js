const cluster  =  require('cluster');
const  http    =  require('http')
const express  =  require('express');
const morgan   =  require('morgan'); 
const router   =  require('./router')
const cors        =  require('cors')
const bodyParser =  require('body-parser');

//env
require('dotenv').config()	

const app = express()
let   workers  =  [];

//Error Rejection handler
process.on('unhandledRejection',(rejectionErr)=>{
	console.log('R_Err ',rejectionErr)
	console.log('R_Stack',JSON.stringify(rejectionErr.stack));
})

//Error Execption handler	
process.on('uncaughtException',(uncaughtExc)=>{
	console.log('E_Err::', uncaughtExc)
	console.log('E_Stack::', JSON.stringify(uncaughtExc.stack))
})

const setupWorkerProcess = () => {
	let numCPUs = process.env.CPU_ALLOWED ||  require('os').cpus().length 

	//read total core
	console.info(`total cores  : `+numCPUs)
	
	for(let i = 0; i < numCPUs; i++){

		//message from  worker 
		workers.push(cluster.fork())

		//receive  message   from worker
		workers[i].on('message',function (message){
			console.log(message);
		})

	} 

	cluster.on('online', function(worker){
		//console.log()
		console.log('Worker '+worker.process.pid + ' is listening');
	})

	cluster.on('exit', function (worker,code,signal){
		console.log(`Worker ${worker.process.pid} died with code : ${code} and signal: ${signal}`)
		console.log(`starting a new worker`)
		cluster.fork()

		worker.push(cluster.fork())
		workers[workers.length-1].on('message', function (message){
			console.log(`message :  ${message}`)
		})
	})	
}

const setUpExpress = () =>{
	
	app.server =  http.createServer(app);
	app.use(morgan('tiny'))
	app.use(cors())
	app.use(bodyParser.json({
		limit : '2mb'
	}))
	app.disable('x-powered-by');
	app.use('/',router)
	app.server.listen(process.env.PORT || 1804,()=>{
		console.log(`Ready, take of on port ${app.server.address().port} and processing at PID :: ${process.pid}`)
	})
	app.on('error',(appErr,appRes)=>{
		console.error('appError',appErr.stack)
		console.error('uriError',appRes.req.url)
		console.error('returnHeaderOnErrorModel',appRes.req.headers)
	})
}	

const setupServer  = (isClusterRequired) =>{
	if(isClusterRequired && cluster.isMaster){
		setupWorkerProcess();
	}else{
		setUpExpress();
	}
}

setupServer(true);



