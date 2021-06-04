"use strict"
const config = require('./config')
const Request = require('./inc/request')
const {success} = require('./inc/log')
const {getCurrentSeason, TEAMS} = require('./constants')

class Nba {
    request
    constructor(){
        this.request = new Request(config)
    }



    /**
     * @param {*} seasonType 
     * @param {*} leagueId 
     */
    
    getAllTimeLeadersGrid = async (seasonType='Regular',leagueId='00') => this.request.get(`alltimeleadersgrids?LeagueID=${leagueId}&PerMode=Totals&SeasonType=${seasonType}+Season&TopX=10`)



    /**
     * 
     * @param {*} playerOrTeam : (Player)|(Team)
     * @param {*} seasonType : (Playoffs)|(All Star)|(Pre Season)
     * @param {*} leagueId 
     * @param {*} season : '2019-20'
     */
    getAssistLeaders = async (playerOrTeam='Team',seasonType='Regular',leagueId='00',season=null) => {
        season = season || getCurrentSeason()
        return this.request.get(`assistleaders?LeagueID=${leagueId}&PerMode=Totals&PlayerOrTeam=${playerOrTeam}&Season=${season}&SeasonType=${seasonType}+Season`)
    }



    /**
     * 
     * @param {*} seasonType : (Playoffs)|(All Star)|(Pre Season)
     * @param {*} leagueId 
     */

    getAllTimeLeadersGrid = async (seasonType='Regular',leagueId='00') => await this.request.get(`alltimeleadersgrids?LeagueID=${leagueId}&PerMode=Totals&SeasonType=${seasonType}+Season&TopX=10`)



    /**
     * 
     * @param {*} season  : '2019-20'
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

    leagueLeaders = async (season=null,category='PTS', seasonType='Playoffs',leagueId='00',perMode='PerGame') => {
        season = season || getCurrentSeason()
        return this.request.get(`leagueLeaders?LeagueID=${leagueId}&PerMode=${perMode}&Scope=S&Season=${season}&SeasonType=${seasonType}&StatCategory=${category}`)
    }

    /**
     * 
     * @param {*} leagueId 
     */
    teamList = async (leagueId='00') => this.request.get(`commonTeamYears?LeagueID=${leagueId}`)

    /**
     * 
     * @param {*} teamId 
     * @param {*} season 
     * @param {*} leagueId 
     * @param {*} seasonType 
     * @returns 
     */

    teamSummary = async (teamId=null, season=null, leagueId='00', seasonType='Playoffs') => {
        return this.request.get(`teaminfocommon?LeagueID=${leagueId}&TeamID=${teamId}&Season=${season}&SeasonType=${seasonType}`)
    }

    /**
     * 
     * @param {*} teamId 
     * @returns 
     */

    teamDetails = async (teamId=null) => {
        return this.request.get(`teamdetails?TeamID=${teamId}`)
    }
}

module.exports = {
    Nba
}