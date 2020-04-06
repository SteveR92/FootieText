import React from 'react'
import { withRouter } from 'react-router-dom';
import './Result.css'


function Result (props) {
 
    let games = []
    for (let i in props) {
        games.push(props.result)
    }


    let dates


    for (let game in games) {
       dates = [games[game].event_date] 
    }

    
    let setDates = new Set(dates)
    let datesArr = [...setDates]
    let homeTeam = [props.result.homeTeam.team_name]
   
    for (let i = 0; i < homeTeam.length; i++) {
        if (homeTeam[i] === "Manchester City") {
            homeTeam[i] = "Man City"
        } else if (homeTeam[i] === "Manchester United") {
            homeTeam[i] = "Man Utd"
        }
    }

    let awayTeam = [props.result.awayTeam.team_name]

    for (let i = 0; i < awayTeam.length; i++) {
        if (awayTeam[i] === "Manchester City") {
            awayTeam[i] = "Man City"
        } else if (awayTeam[i] === "Manchester United") {
            awayTeam[i] = "Man Utd"
        } else if (awayTeam[i] === "Sheffield Utd") {
            awayTeam[i] = "Sheff Utd"
        } else if (awayTeam[i] === "Crystal Palace") {
            awayTeam[i] = "C. Palace"
        }
    }

    let homeGoals = [props.result.goalsHomeTeam]
    let awayGoals = [props.result.goalsAwayTeam]
    let elapsed = [props.result.elapsed]
    let homeEvents = []
    let awayEvents = []

    for (let i = 0; i < elapsed.length; i++) {
        if (elapsed[i] === 90 || elapsed[i] === 0) {
            elapsed[i] = ""
        } else {
            elapsed[i] = "'" + elapsed[i]
        }
    }

    if (props.result.events !== null) {
    props.result.events.filter(teamName => {
        if (teamName.teamName === props.result.homeTeam.team_name) {
            homeEvents.push(teamName)
        }
        if (teamName.teamName === props.result.awayTeam.team_name) {
            awayEvents.push(teamName)
        }
    })
    }
    
    
    let homeGoalScorers = []

    homeEvents.filter(goal => {
        if (goal.type === "Goal" && goal.detail === "Normal Goal" || goal.type === "Goal" && goal.detail === "Penalty" || goal.type === "Goal" && goal.detail === "Own Goal") {
            homeGoalScorers.push(goal)
        }
    })


    let awayGoalScorers = []


    awayEvents.filter(goal => {
        if (goal.type === "Goal" && goal.detail === "Normal Goal" || goal.type === "Goal" && goal.detail === "Penalty" || goal.type === "Goal" && goal.detail === "Own Goal" ) {
            awayGoalScorers.push(goal)
        }
    })

    let dash = ''

    if (props.result.statusShort === "PST") {
        dash = "PST"
    } else {
        dash = '-'
    }

    const routeChange = (e) => {
        let path = ''
        let id = ''
        let dashText
        if (e.target !== 'ul') {
            dashText = e.target.parentNode.childNodes[1].textContent
        } 

        if (dashText === "PST") {
            path = '330'
            props.history.push(path)
        } else {
            path = '400'
            id = props.result
            props.history.push(path, { id })
        }   
    }

    return (
        <div className="result">

            <ul className="rs-scores" onClick={routeChange}>
            {
                datesArr.map((i, j) => {
                    let dateTime = `${i.substring(8, 10)}/${i.substring(5, 7)} ${i.substring(11, 16)}`
    
                    return <h3 id="date-time">{dateTime}</h3>
                })
            }
                <li id="rs-team-name" className='rs-home-team-name'>{homeTeam}</li>
                <li className='rs-home-score'>{homeGoals}</li>
                <li className='rs-dash'>{dash}</li>
                <li className='rs-away-score'>{awayGoals}</li>
                <li id="rs-team-name" className='rs-away-team-name'>{awayTeam} <span className="time">{elapsed}</span></li>

            </ul>
            <div className="scores-cols">
            <ul className="rs-home-scorers-col">
                { homeGoalScorers.map((i, j) => {
                    let ownGoal
                    if (i.detail === "Own Goal") {
                        ownGoal = "(OG)"
                    }
                    const goalTime = i.elapsed
                    return <li className="rs-home-scorers">{i.player} <span class="yellowGreen">'{goalTime}</span> {ownGoal}</li>
                })}
            </ul>
            <ul className="rs-away-scorers-col">
                { awayGoalScorers.map((i, j) => {
                    let ownGoal
                    if (i.detail === "Own Goal") {
                        ownGoal = "(OG)"
                    }
                    const goalTime = i.elapsed
                    return <li className='rs-away-scorers'>{i.player} <span class="yellowGreen">'{goalTime}</span> {ownGoal}</li>
                })}
            </ul>
            </div>
        </div>
    )
}

export default withRouter(Result)
