import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { withRouter } from 'react-router-dom';
import Events from './Events'
import './Stats.css'
import ball from './ball.png'
import ball2 from './ball2.png'
import ball3 from './ball3.png'
import ballOG from './ballOG.png'
import ballP from './ballP.png'
import Statistics from './Statistics'


function Stats (props) {


    let homeName = props.location.state.id.homeTeam.team_name
    let awayName = props.location.state.id.awayTeam.team_name
    let homeScore = props.location.state.id.goalsHomeTeam
    let awayScore = props.location.state.id.goalsAwayTeam
    let homeEvents = []
    let awayEvents = []
    let events = props.location.state.id.events
    let lineups = [props.location.state.id.lineups]
    let homeGoalScorerCheck = []
    let homeLineUpCheck = []
    let awayGoalScorerCheck = []
    let awayLineUpCheck = []


    if (events !== null) {
        events.filter(teamName => {
            if (teamName.teamName === homeName) {
                homeEvents.push(teamName)
             
            }
            if (teamName.teamName === awayName) {
                awayEvents.push(teamName)
            }
        })
    }

    /*------ LINEUPS ------*/
    let homeLineUpArr = Object.values(lineups[0])[0].startXI
    let homeLineUp = []
    homeLineUpArr.forEach(player => {
        homeLineUp.push(player.player.normalize("NFKD").replace(/[^\w\s-._\/]/g, ''))
    })



    let awayLineUpArr = Object.values(lineups[0])[1].startXI
    let awayLineUp = []
    awayLineUpArr.forEach(player => {
        awayLineUp.push(player.player.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""))
    })
  

    
  

    /*-------- GOAL SCORERS -----------*/

    
    let homeGoalScorers = []


    homeEvents.filter(goal => {
        if (goal.type === "Goal") {
            homeGoalScorers.push(goal)
        }
    })


    let awayGoalScorers = []


    awayEvents.filter(goal => {
        if (goal.type === "Goal") {
            awayGoalScorers.push(goal)
        }
    })




    awayGoalScorers.forEach(player => {
        if (player.detail === "Normal Goal" || player.detail === "Penalty") {
        awayGoalScorerCheck.push(`${player.player}`)
        }
    })

    //INCLUDES BRAZILLIAN NAME CHECK
    homeLineUp.forEach(player => {
        homeLineUpCheck.push(player.includes(' ') ? `${player.charAt(0)}. ${player.split(" ")[1]}` : player)
        
    })
    awayLineUp.forEach(player => {
        awayLineUpCheck.push(player.includes(' ') ? `${player.charAt(0)}. ${player.split(" ")[1]}` : player)
    })

    
    //Dutch and De
    for (let i = 0; i < homeLineUpCheck.length; i++) {
        for (let j = 0; j < homeLineUp.length; j++) {
            if (homeLineUpCheck[i].includes('van') && homeLineUp[j].includes('van ') || homeLineUpCheck[i].includes('De') && homeLineUp[j].includes('De ') || homeLineUpCheck[i].includes('Lo') && homeLineUp[j].includes('Lo ')) {
                homeLineUpCheck[i] = homeLineUpCheck[i].replace(homeLineUpCheck[i], `${homeLineUp[j].charAt(0)}. ${homeLineUp[j].split(" ")[1]} ${homeLineUp[j].split(" ")[2]}`)
            }
        }
    }
    for (let i = 0; i < awayLineUpCheck.length; i++) {
        for (let j = 0; j < awayLineUp.length; j++) {
            if (awayLineUpCheck[i].includes('van') && awayLineUp[j].includes('van ') || awayLineUpCheck[i].includes('De') && awayLineUp[j].includes('De ') || awayLineUpCheck[i].includes('Lo') && awayLineUp[j].includes('Lo ')) {
                awayLineUpCheck[i] = awayLineUpCheck[i].replace(awayLineUpCheck[i], `${awayLineUp[j].charAt(0)}. ${awayLineUp[j].split(" ")[1]} ${awayLineUp[j].split(" ")[2]}`)
            }
        }
    }

    //Martinelli check --- API has two versions of name 
    for (let i = 0; i < homeLineUpCheck.length; i++) {
        if (homeLineUpCheck[i].includes('Martinelli')) {
           homeLineUpCheck[i] = homeLineUpCheck[i].split(" ")[1] 
        }
    }
   
    for (let i = 0; i < awayLineUpCheck.length; i++) {
            if (awayLineUpCheck[i].includes('Martinelli')) {
               awayLineUpCheck[i] = awayLineUpCheck[i].split(" ")[1] 
        }
    }

    //Son Heung-min check --- API has two versions of name 
    for (let i = 0; i < homeEvents.length; i++) {
        if (homeEvents[i].player === "Son Heung-Min") {
           homeEvents[i].player = "H. Son" 
        }
    }
    for (let i = 0; i < awayEvents.length; i++) {
        if (awayEvents[i].player === "Son Heung-Min") {
           awayEvents[i].player = "H. Son" 
        }
    }


    // ß Check
    for (let i = 0; i < awayLineUpCheck.length; i++) {
        if (awayLineUpCheck[i].includes('ß')) {
           awayLineUpCheck[i] = awayLineUpCheck[i].replace("ß", "ss")
        }
    }
    for (let i = 0; i < homeLineUpCheck.length; i++) {
        
        if (homeLineUpCheck[i].includes('ß')) {
           homeLineUpCheck[i] = homeLineUpCheck[i].replace("ß", "ss")
        }
    }


    homeGoalScorers.forEach(player => {
        if (player.detail === "Normal Goal" || player.detail === "Penalty") {
        
            homeGoalScorerCheck.push(`${player.player}`)
        }
    })


    let homeGoalImage = {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: ""
    }


    let awayGoalImage = {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: ""
    }


    function findHomeOwnGoals (el) {
        for (let i = 0; i < homeLineUpCheck.length; i++) {
            for (let j = 0; j < awayGoalScorerCheck.length; j++) {
                if (homeLineUpCheck[i] === awayGoalScorerCheck[j]) {
                    homeGoalImage[i] = ballOG
                } 
                
            }
        }
    }

    findHomeOwnGoals()

    function findAwayOwnGoals (el) {
        for (let i = 0; i < awayLineUpCheck.length; i++) {
            for (let j = 0; j < homeGoalScorerCheck.length; j++) {
                if (awayLineUpCheck[i] === homeGoalScorerCheck[j]) {
                    awayGoalImage[i] = ballOG
                } 
                
            }
        }
    }

    findAwayOwnGoals()
  

    let homeMultiGoalCheck = homeGoalScorerCheck.reduce(function(obj, b) {
        
        obj[b] = ++obj[b] || 1;
        
        return obj;
 
      }, {});

      function findHomeGs (el) {
        
        for (let i = 0; i < homeLineUpCheck.length; i++) {
   
            for (let j = 0; j < homeGoalScorerCheck.length; j++) {
              for (const [player, goals] of Object.entries(homeMultiGoalCheck)) {
                  if (player === homeLineUpCheck[i] && goals == 2) {
                    homeGoalImage[i] = ball2
                  } else if (player === homeLineUpCheck[i]  && goals == 3) {
                    homeGoalImage[i] = ball3
                  } else if (player === homeLineUpCheck[i]  && goals == 1) {
                    homeGoalImage[i] = ball
                  }
                  
              } 

            }
        }
      
    };

    findHomeGs();

    let awayMultiGoalCheck = awayGoalScorerCheck.reduce(function(obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {});

      function findAwayGs (el) {
        
        for (let i = 0; i < awayLineUpCheck.length; i++) {
 
            for (let j = 0; j < awayGoalScorerCheck.length; j++) {
              for (const [player, goals] of Object.entries(awayMultiGoalCheck)) {
                  if (player === awayLineUpCheck[i]  && goals == 2) {
                    awayGoalImage[i] = ball2
                  } else if (player === awayLineUpCheck[i]  && goals == 3) {
                    awayGoalImage[i] = ball3
                  } else if (player === awayLineUpCheck[i]  && goals == 1) {
                    awayGoalImage[i] = ball
  
                  }
              } 

            }
        }
      
    };
    findAwayGs();

    
    
  

    /*---- SUBTITUTES ----*/
    let subs = []
    let homeSubs = []
    let awaySubs = []

    let homeSubGoal = {
        1: "",
        2: "",
        3: ""
    }


    let awaySubGoal = {
        1: "",
        2: "",
        3: ""
    }
    if (events !== null){
     events.filter(sub => {
        if (sub.type === "subst") {
            subs.push(sub)
        }
    })
}
    subs.filter(player => {
        if (player.teamName === homeName) {
            homeSubs.push(player)
        } else {
            awaySubs.push(player) 
        }
    })


    /*---- SUB GOALS ------*/

    function findHomeSubGs (el) {
        
        for (let i = 0; i < homeSubs.length; i++) {

            for (let j = 0; j < homeGoalScorerCheck.length; j++) {
              for (const [player, goals] of Object.entries(homeMultiGoalCheck)) {
                
                  if (player === homeSubs[i].detail  && goals == 2) {
                    homeSubGoal[i] = ball2
                  } else if (player === homeSubs[i].detail  && goals == 3) {
                    homeSubGoal[i] = ball3
                  } else if (player === homeSubs[i].detail  && goals == 1) {
    
                    homeSubGoal[i] = ball
  
                  }
              } 

            }
        }
      
    };
    
    findHomeSubGs();

    function findAwaySubGs (el) {
        
        for (let i = 0; i < awaySubs.length; i++) {
 
            for (let j = 0; j < awayGoalScorerCheck.length; j++) {
              for (const [player, goals] of Object.entries(awayMultiGoalCheck)) {
                  if (player === awaySubs[i].player  && goals == 2) {
                    awaySubGoal[i] = ball2
                  } else if (player === awaySubs[i].player  && goals == 3) {
                    awaySubGoal[i] = ball3
                  } else if (player === awaySubs[i].player  && goals == 1) {
    
                    awaySubGoal[i] = ball
  
                  }
              } 

            }
        }
      
    };
    
    findAwaySubGs();

    const routeChange = () => {
        let path = `330`
  
        props.history.push(path)
    }


    return (


        <div>
       
            <Header />
           <div className="lineups">
            <h2 className="back-button" onClick={routeChange}>Back</h2>
            <button onClick={() => this.props.handleRefresh()}>Refresh</button>
            <h2>Line-Ups</h2>
            <table>

                <tr><th>{homeName}</th><th className="scores">{homeScore}</th><th className="scores"> - </th><th className="scores">{awayScore}</th><th className="awayTD">{awayName}</th></tr>
                <tbody>
                    {homeLineUpCheck.map((i, j) => {
                        const awaySide = awayLineUpCheck[j]
                        const homeGoal = homeGoalImage[j]
                        const awayGoal = awayGoalImage[j]
                        return <tr><td className="homeTD">{i}</td><td className="goalScorerCol"><img src={homeGoal} width="20px" id="footballImg"/></td><td></td><td className="goalScorerCol"><img src={awayGoal} width="20px" id="footballImg"/></td><td className="awayTD">{awaySide}</td></tr>
                    })
                    
                }
                    
                </tbody>

            </table>
            </div>
            <h2 className="subsTitle">Subtitutes</h2>
            <div className="subSection">


            <ul className="home-subs">
                    {homeSubs.map((i, j) => {
                        const goal = homeSubGoal[j]
                        return <li>{i.elapsed}' <strike>{i.player}</strike> {String.fromCharCode(8644)}<br/>{i.detail} <img src={goal} width="15px" id="footballImg" /></li>
                    })}
            </ul>
            <ul className="away-subs">
                    {awaySubs.map((i, j) => {
                        const goal = awaySubGoal[j]
                        return <li>{i.elapsed}' <strike>{i.player}</strike> {String.fromCharCode(8644)}<br/>{i.detail} <img src={goal} width="15px" id="footballImg" /></li>
                    })}
            </ul>
        

            </div>
           
            <div className="match-events-container">
            <h2 className="subsTitle">Events</h2>
            <Events props={props}/>
            </div>
            <br></br>
            <div className="match-statistics-container">
            <Statistics props={props}/>
            </div>
            <h2 className="back-button" onClick={routeChange}>Back</h2>
            <Footer />
        </div>
    )
}

export default withRouter(Stats)

 