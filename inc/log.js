var colors = require('colors');


const success = (log) => {
    if(Array.isArray(log)){
        console.log(`(A) => `)
            log.map( (val,key) => {
                if(typeof val != 'string'){
                    console.log(`${key} => `)
                    success(val)
                }
                console.log(`${key.toString().bgBlack} => ${val.green}`)
            })
        return
    }
     
    switch(typeof log){
        case 'object':
            console.log(`(O) =>`.green)
            console.log(JSON.stringify(log))
            break;
        
        case 'string':
            console.log(`(S) => ${log.green}`)
            break;
        
        case 'number':
            console.log(`(N) => ${log.toString().green}`)
            break;
        
    }
    
}
module.exports = {
    success
}