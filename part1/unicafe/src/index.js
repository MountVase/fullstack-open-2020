import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" />
      <Button text="neutral" />
      <Button text="bad" />

      <Header text ="statistics" />
    </div>
  )
}

const Header = props => <h1>{props.text}</h1>

const Button = props => <button>{props.text}</button>



ReactDOM.render(<App />, 
  document.getElementById('root')
)