// const express = require('express');
import express from 'express'
const app = express();

import { calculateBmi } from './calculateBmi'
import { calculateExercise } from './exerciseCalculator'


app.use(express.json())



app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)


  if (!isNaN(weight) && !isNaN(height)) {
    const obj = calculateBmi(height, weight)
    res.send(obj)
  }

  else {
    res.send({ error: 'malformatted parameters' })
  }

})

app.post('/exercise', (req, res) => {
  try {

    const result = calculateExercise( [ ...req.body.daily_exercises ] , req.body.target )
    return res.json(result)

  } catch (e) {
    return res.json({ error: e.message })
  }
})


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});