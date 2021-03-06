'use strict';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const sampleData =  require('./mocking.json')

console.log(sampleData)
//wrapper  cluster 
function clusterRunner(){
    if (cluster.isMaster){
        masterProcess();
    } else {
        childProcess();
    }
}

async function masterProcess(){
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork();
    }      
    process.exit();
}

function childProcess() {
    console.log(`Worker ${process.pid} started and finished`);

    process.exit();
}

//runner
clusterRunner()