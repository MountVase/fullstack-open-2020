import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  //use these values + setters in some way

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() =>setNeutral(neutral + 1)}text="neutral" />
      <Button handleClick={() => setBad(bad + 1)}text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

const Header = props => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

//Perhaps separate Statistics and Feedback??
const Statistic = ({text, count}) => {
  return (
  <p>{text} {count}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
	if (good == 0 && neutral == 0 && bad==0) {
		return (
		  <>
          <h1>statistics</h1>
          <p>No feedback given</p>
          </>
		)
	}
	return (
	<>
	  <h1>statistics</h1>
	  <table>
     
	  <Statistic text="good" count={good}/>
	  <Statistic text="neutral" count={neutral}/>
	  <Statistic text="bad" count={bad}/>
    <Statistic text="all" count={good+neutral+bad} />
    <Statistic text="average" count={average(good,neutral,bad)} />
    <Statistic text="positive" count={positive(good, neutral, bad)} />
	  </table>
	</>
	)
}



const average = (good, neutral, bad) => (good-bad)/(good+neutral+bad)
const positive = (good, neutral, bad) => (good/(good+neutral+bad)*100) + " %"


ReactDOM.render(<App />, 
  document.getElementById('root')
)