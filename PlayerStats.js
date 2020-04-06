import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { withRouter } from 'react-router-dom';
import './player-stats.css'


function PlayerStats(props) {
    let teamID = props.history.location.state.id
    let thisTeam = []

    for(let i = 0; i < props.playerStats.length; i++) {
        if (props.playerStats[i].team_id === teamID) {
            thisTeam.push(props.playerStats[i])
        }
    }

    let players = []

    for (let i = 0; i < thisTeam.length; i++) {
        players.push(thisTeam[i].playerStats.players)
    }

    let teamSheet = []
    for (const player in players) {
        teamSheet.push(players[player])
    }

    //CHECK FOR LOAN AND SIGNED

    let firstTeam = []

        for (let i = 0; i < teamSheet.length; i++) {
            
            for (const val in teamSheet[i]) {
    
                switch (teamSheet[i][val].player_id) {
        case 3245:
        teamSheet[i][val].position = 'S'
        break;
        case 227:
        teamSheet[i][val].position = 'L'
        break;
        case 138815:
        teamSheet[i][val].position = 'S'
        break;
        case 894:
        teamSheet[i][val].position = 'S'
        break;
        case 890:
        teamSheet[i][val].position = 'L'
        break;
        case 113:
        teamSheet[i][val].position = 'S'
        break;
        case 171:
        teamSheet[i][val].position = 'L'
        break;
        case 167:
        teamSheet[i][val].position = 'L'
        break;
        case 174:
        teamSheet[i][val].position = 'S'
        break;
        case 48105:
        teamSheet[i][val].position = 'L'
        break;
        case 741:
        teamSheet[i][val].position = 'L'
        break;
        case 1649:
        teamSheet[i][val].position = 'L'
        break;
        case 18738:
        teamSheet[i][val].position = 'L'
        break;
        case 1447: 
        teamSheet[i][val].position = 'S'
        break;
        case 1457:
        teamSheet[i][val].position = 'L'
        break;
        case 1161:
        teamSheet[i][val].position = 'L'
        break;
        case 2288:
        teamSheet[i][val].position = 'L'
        break;
        case 18944:
        teamSheet[i][val].position = 'L'
        break;
        case 190:
        teamSheet[i][val].position = 'L'
        break;
        case 18998:
        teamSheet[i][val].position = 'L'
        break;
        case 18900:
        teamSheet[i][val].position = 'S'
        break;
        case 18981:
        teamSheet[i][val].position = 'L'
        break;
        case 3398:
        teamSheet[i][val].position = 'S'
        break;
        case 18978:
        teamSheet[i][val].position = 'L'
        break;
        case 18822:
        teamSheet[i][val].position = 'L'
        break;
        case 2886:
        teamSheet[i][val].position = 'S'
        break;
        case 47251:
        teamSheet[i][val].position = 'L'
        break;
        case 18801:
        teamSheet[i][val].position = 'S'
        break;
        case 2049:
        teamSheet[i][val].position = 'L'
        break;
        case 19087:
        teamSheet[i][val].position = 'S'
        break;
        case 47521:
        teamSheet[i][val].position = 'L'
        break;
        case 19172:
        teamSheet[i][val].player_name = "O. Nyland"
        break
        case 2997:
        teamSheet[i][val].player_name = "L. Fabianksi"
        break

        
    }
        if (teamSheet[i][val].league === "Premier League" && teamSheet[i][val].games.appearences > 0) {
            firstTeam.push(teamSheet[i][val])
        }
        }
    }

    const item_order = ["Goalkeeper","Defender","Midfielder","Attacker", "L", "S"];

    firstTeam.sort((a, b) => item_order.indexOf(a.position) - item_order.indexOf(b.position));



   let name = []
   let position = []
   let age = []
   let nationality = []
   let appearences = []
   let totalShots = []
   let shotsOnTarget = []
   let passesTotal = []
   let passAccuracy = []
   let totalTackles = []
   let attemptedDribbles = []
   let successfulDribbles = []
   let foulsDrawn = []
   let foulsCommitted = []
   let yellowCards = []
   let redCards = []
   let peanltiesWon = []
   let penaltiesCommitted = []
   let assists = []
   let goals = []

   
   for (let i = 0; i < firstTeam.length; i++) {
       let val = firstTeam[i]
       name.push(val.player_name.normalize("NFKD").replace(/[^\w\s-._\/]/g, ''))
       position.push(val.position)
       age.push(val.age)
       nationality.push(val.birth_country)
       appearences.push(val.games.appearences)
       totalShots.push(val.shots.total)
       shotsOnTarget.push(val.shots.on)
       passesTotal.push(val.passes.total)
       passAccuracy.push(val.passes.accuracy)
       totalTackles.push(val.tackles.total)
       attemptedDribbles.push(val.dribbles.attempts)
       successfulDribbles.push(val.dribbles.success)
       foulsDrawn.push(val.fouls.drawn)
       foulsCommitted.push(val.fouls.committed)
       yellowCards.push(val.cards.yellow)
       redCards.push(val.cards.red)
       peanltiesWon.push(val.penalty.won)
       penaltiesCommitted.push(val.penalty.committed)
       assists.push(val.goals.assists)
       goals.push(val.goals.total)
     
    }




    const routeChange = (e) => {
        let path = `590`
        let id = ''
        for (let i = 0; i < firstTeam.length; i++) {
            if (e.target.textContent === firstTeam[i].player_name.normalize("NFKD").replace(/[^\w\s-._\/]/g, '')) {
                id = firstTeam[i].player_id
            }
        }
        props.history.push(path, { id, teamID })
    }

    const backButton = () => {
        let path = `324`
        let id = props.result
        props.history.push(path, { id })
    }


    return (
        <div>
        <div><Header /></div>
        <div>
            <h2 className="back-button" onClick={backButton}>Back</h2>
            <h2>Player Stats</h2>
            <table className="playerStat-table">
                <tr><th id="name-cell">Name</th><th id="pos-cell">Pos</th></tr>
                <tbody>
                {
                    name.map((i, j) => {
                        let pos = position[j].slice(0, 1)
                        return <tr onClick={routeChange}><td id="name-cell">{i}</td><td id="pos-cell">{pos}</td></tr>
                    })
                }
                </tbody>
            </table>
            <Footer />
        </div>
        </div>
    )
}

export default withRouter(PlayerStats)