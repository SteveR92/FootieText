import React from 'react'
import { withRouter } from 'react-router-dom';
import './Table.css'

function Table(props) {

  let pos = [];
  let teams = [];
  let played = [];
  let wins = [];
  let draws = [];
  let losses = [];
  let goalsScored = [];
  let goalsAgainst = [];
  let points = [];
  for (let i = 0; i < props.table.length; i++) {
      pos.push(props.table[i].rank)
      teams.push(props.table[i].teamName)
      played.push(props.table[i].all.matchsPlayed)
      wins.push(props.table[i].all.win)
      draws.push(props.table[i].all.draw)
      losses.push(props.table[i].all.lose)
      goalsScored.push(props.table[i].all.goalsFor)
      goalsAgainst.push(props.table[i].all.goalsAgainst)
      points.push(props.table[i].points)
 }

  for (let i = 0; i < teams.length; i++) {
    if (teams[i] === "Manchester United") {
      teams[i] = 'Man United'
    } else if (teams[i] === "Manchester City") {
      teams[i] = "Man City"
    }
  }

  const routeChange = (e) => {
    let id = ''
    for (let i = 0; i < props.table.length; i ++) {
      if (e.target.textContent === props.table[i].teamName) {
        id = props.table[i].team_id
      } else if (e.target.textContent === "Man City") {
        id = 50
      } else if (e.target.textContent === "Man United") {
        id = 33
      }
    }
    let path = `550`

      props.history.push(path, { id })
  }


  return (
  <div className="table-div">
      <div id="fixtures-container">
      <table>
      <tbody className="table">
      <tr>
        <th>Pos</th>
        <th>Team</th>
        <th id="table-title-header">P</th>
        <th id="table-title-header">W</th>
        <th id="table-title-header">D</th>
        <th id="table-title-header">L</th>
        <th id="table-title-header">F</th>
        <th id="table-title-header">A</th>
        <th id="table-title-header">Pts</th>
      </tr>
          
      {   teams.map((team_name, index) => {
          const po = pos[index];
          const team = team_name;
          const matches = played[index]
          const win = wins[index]
          const draw = draws[index]
          const lost = losses[index]
          const goals = goalsScored[index]
          const against = goalsAgainst[index]
          const pts = points[index]
           return <tr key={team} onClick={routeChange}><td>{po}</td><td id="team">{team}</td><td className="table-number">{matches}</td><td className="table-number">{win}</td><td className="table-number">{draw}</td><td className="table-number">{lost}</td><td className="table-number">{goals}</td><td className="table-number">{against}</td><td className="table-number">{pts}</td></tr>
      })
      }  
      </tbody>
      </table>
      </div>
  </div>
  )
}

export default withRouter(Table)