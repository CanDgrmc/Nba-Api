"use strict"
const config = require('./config')
const Request = require('./inc/request')
const {success} = require('./inc/log')
function getCurrentSeason(){
    return `${new Date().getFullYear() -1}-${(new Date().getFullYear().toString().slice(2))}`
}

class Nba {
    request
    constructor(){
        this.request = new Request(config)
    }

    /**
     * @param {*} seasonType 
     * @param {*} leagueId 
     */
    
    getAllTimeLeadersGrid = async (seasonType='Regular',leagueId='00') => await this.request.get(`alltimeleadersgrids?LeagueID=${leagueId}&PerMode=Totals&SeasonType=${seasonType}+Season&TopX=10`)


    /**
     * 
     * @param {*} playerOrTeam 
     * @param {*} seasonType 
     * @param {*} leagueId 
     * @param {*} season 
     */
    getAssistLeaders = async (playerOrTeam='Team',seasonType='Regular',leagueId='00',season=null) => {
        season = season || getCurrentSeason()
        console.log({season})
        success(`season ${season}`)
        return await this.request.get(`assistleaders?LeagueID=${leagueId}&PerMode=Totals&PlayerOrTeam=${playerOrTeam}&Season=${season}&SeasonType=${seasonType}+Season`)
    }

    /**
     * 
     * @param {*} seasonType 
     * @param {*} leagueId 
     */

    getAllTimeLeadersGrid = async (seasonType='Regular',leagueId='00') => await this.request.get(`alltimeleadersgrids?LeagueID=${leagueId}&PerMode=Totals&SeasonType=${seasonType}+Season&TopX=10`)

    /**
     * 
     * @param {*} season 
     * @param {*} category : 'GP',   'MIN',
                            'FGM',       'FGA',  'FG_PCT',
                            'FG3M',      'FG3A', 'FG3_PCT',
                            'FTM',       'FTA',  'FT_PCT',
                            'OREB',      'DREB', 'REB',
                            'AST',       'STL',  'BLK',
                            'TOV',       'PTS',  'EFF'
     * @param {*} seasonType : (Playoffs)|(All Star)|(Pre Season)
     * @param {*} leagueId 
     * @param {*} perMode : (Totals)|(PerGame)|(Per48)
     */
    leagueLeaders = async (season=null,category='PTS',seasonType='Playoffs',leagueId='00',perMode='PerGame') => {
        // https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2019-20&SeasonType=Playoffs&StatCategory=PTS
        season = season || getCurrentSeason()
        return await this.request.get(`leagueLeaders?LeagueID=${leagueId}&PerMode=${perMode}&Scope=S&Season=${season}&SeasonType=${seasonType}&StatCategory=${category}`)
    }
}

module.exports = {
    Nba
}