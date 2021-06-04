const {Nba} = require('./nba')

const client = new Nba()

client.getAssistLeaders().then( res => {
    console.log('res',res);
}).catch(e => console.log(e))