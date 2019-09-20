const cluster  =  require('cluster');
const express  =  require('express');
const morgan   =  require('morgan'); 
const rouetr   =  require('')
const bodyParser =  require('body-parser');
let   workers  =  [];


//Error Rejection handler
process.on('unhandledRejection',(rejectionErr)=>{
	console.log('R_Err ',rejectionErr)
	console.log('R_Stack',JSON.stringify(rejectionErr.stack));
})

//Error Execption handler	
process.on('uncaughtException',(uncaughtExc)=>{
	console.log('E_Err::', rejectionErr)
	console.log('E_Stack::', JSON.stringify(uncaughtExc.stack))
})


const setupWorkerProcess = () => {
	let numCPUs = requier('os').cpus().length

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

	cluster.on('online', function(message){
		console.log('Worker '+worker.process.id + 'is listening');
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
	app.use(bodyParser.json({
		limit : '2mb'
	}))
	app.disable('x-powered-by');
	setRouter(app)
	app.server.listen('8000',()=>{
		console.log(`We are ready flight on port ${app.server.address().port()} for Process Id ${process.id}`)
	})
	app.on('error',(appErr,appRes)=>{
		console.error('appError',appErr.stack)
		console.error('uriError',appRes.req.url)
		console.error('returnHeaderOnErrorModel',appRes.req.headers)
	})
}	
