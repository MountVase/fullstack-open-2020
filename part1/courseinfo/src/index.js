 
import React from "react"
import ReactDOM from "react-dom"


const App = () => {
  const course = {
    //main course, Header (name)
    name: "Half Stack application development",
    id : 1,

    // parts of said course (parts)
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      }
    ]
  }

  return (

    
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


const Header = (props) => {
 // console.log(props)
  return <h1> {props.course.name} </h1>;
}

const Part = (props) => {
  //console.log(props)

  return (
    <p>
      {props.name} {props.excercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.parts[0].name} excercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} excercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} excercises={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of excercises{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  )
}


ReactDOM.render(<App/> , document.getElementById('root'))