const request = require('request')

module.exports = class  {
    config
    
    constructor(config){
        this.config = config
    }

    async  get(endpoint){

        return new Promise((resolve,reject)=> {

            request.get(
                this.config.baseUrl.replace('@endpoint',endpoint),
                (err,response,body)=>{
                    if(err) reject(err)
                    const {resultSets,resultSet} = JSON.parse(body)
                    let headers,rowSet
                    if(resultSets){
                        headers = resultSets[0].headers
                        rowSet = resultSets[0].rowSet
                    }else if(resultSet){

                        headers = resultSet.headers
                        rowSet = resultSet.rowSet
                        
                    }
                    console.log({headers})
                    resolve(this.setKeyVal(headers,rowSet))
            })
        })
    }


    setKeyVal = (headers,rowSet) => {
        let responseArray = []

        for(let r of rowSet){
            let row = {}
            for(let i in r){

                row[headers[i]] = r[i]
            }
            responseArray.push(row)
        }

        return responseArray
    }

}
