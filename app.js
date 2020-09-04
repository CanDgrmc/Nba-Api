const {Nba} = require('./nba')

const client = new Nba()

client.leagueLeaders().then().catch(e => console.log(e))