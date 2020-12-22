// const express = require('express');
import express from 'express';
const app = express();

import { calculateBmi } from './calculateBmi';


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);


  if (!isNaN(weight) && !isNaN(height)) {
    const obj = calculateBmi(weight, height);
    res.send(obj);
  }

  else {
    res.send({ error: 'malformatted parameters' });
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});