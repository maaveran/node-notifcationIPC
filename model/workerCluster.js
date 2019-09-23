async function  populateHugeList(){
    let lst = new Array(1e6)
        for(let k = 0; k < lst.length; k++){
            lst[k] = k * 5;
        }

    process.send('List is created on worker process id' + process.pid)
}

module.exports = {
    CreateList : async(req,res)=>{
        await populateHugeList();
        res.json({
            ProcessId  : 'Worker Process Id ' + process.pid
        })
    }
}