import React from 'react'



// Structure should be 
// App -> Course -> Header -> Content -> Part123 etc...

const Course = ({ course }) => (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
  
const Header = ({ course }) => <h2>{course}</h2>;
  

const Content = ({ parts }) => (
    <>
      {parts.map(({ name, exercises, id }) => (
        <Part key={ id} name={name} exercises={exercises} />
      ))}
    </>
  )
  
const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  )
  
const Total = ({ parts }) => {
    const total = parts.reduce((accel, currval) => accel + currval.exercises, 0)
    return <p><b>total of {total} exercises</b> </p>;
  }


export default Course