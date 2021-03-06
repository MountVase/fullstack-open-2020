import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams, useHistory
} from "react-router-dom"

import { useField } from './hooks/index'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  
  <div>
    <br></br>
    <br></br>

    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
  
)


const CreateNew = (props) => {

  // spread syntax need key...
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetAuthor ,...author} = useField('text')
  const {reset: resetInfo, ...info} = useField('text')
    
  
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value
    })


    // TODO, notif + reroute
    history.push('/')
  }

  const resetFields = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} value={content.value} onChange={content.onChange}></input>
        </div>
        <div>
          author
          <input {...author}></input>
        </div>
        <div>
          url for more info
          <input {...info}></input>
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetFields}>Reset</button>
      </form>
    </div>
  )

}


const Notifcation = ({ message }) => {

  const notifStyle= {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  }

  if (message) {
    return (
      <div style={notifStyle}>
        {message}
      </div>
    )
  } else {
    return null
  }
}



const Anecdote = ({ anecdotes }) => {
  const id = useParams().id

  const anecdote = anecdotes.find(a => a.id === id)
  

  // lol what a troll why is anecdote.url all of a sudden anecdote.info hahah
  
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => setNotification(''), 10000)

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      
      <Router>
      <Menu></Menu>
      <Notifcation message={notification}></Notifcation>
        <Switch>
          <Route path="/about"> <About></About> </Route>

          <Route path="/create"> <CreateNew addNew={addNew}></CreateNew> </Route>

          <Route path="/anecdotes/:id"> <Anecdote anecdotes={anecdotes}></Anecdote></Route>

          <Route path="/"> <AnecdoteList anecdotes={anecdotes}></AnecdoteList> </Route>

          
        </Switch>
      </Router>

      <Footer />
    </div>
  )
}

export default App
