const createResponse=(success,message,data)=>{

    return({
        ok:success,
        message:message,
        data:data
    })

}

module.exports={createResponse}