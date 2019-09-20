export default class AsyncListController{
    
    createList = async(req,res)=>{
        await this.populateHugeList();
        res.json({
            ProcessId  : 'Worker Process Id ' + process.id
        })
    }

    populateHugeList = async() =>{
        let lst = new Array(ie6)
            for(let k = 0; k < lst.length; k++){
                lst[k] = k * 5;
            }

        process.send('List is created on worker process id' + process.pid)
    }
}