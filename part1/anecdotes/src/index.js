import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // tried to get a random anecdote from start
  //const [selected, setSelected] = useState(rdnInt(props.anecdotes))

  //    selected, and votes can interact!
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
                          // new Array with zeroes for every anecdote
  const [maxVotes, setMaxvotes] = useState(0)


  const handleAnecdote = () => {
    setSelected(rndInt(props.anecdotes))
  }

  const handleVote = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)

    if (votes[selected] >= votes[maxVotes]) {
      setMaxvotes(selected)
    }
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
    <div> {props.anecdotes[selected]} </div>
    <div>has {votes[selected]} votes </div>

      <button onClick={handleVote}> vote</button>
      <button onClick={handleAnecdote}> next anecdote</button>
    </div>
    <h1>Anecdote with the most votes</h1>
    <div>{props.anecdotes[maxVotes]}</div>
    <div>has {votes[maxVotes]} votes</div>
    </>
  )
}




const rndInt = (liste) => Math.floor(Math.random() * liste.length)
const lisst = ["je", "boi", "test", "this", "out"]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// essentially we are passing whole anecdotes list to App
// handling is also done within app
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
