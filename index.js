const express = require('express');
const fs = require('fs').promises;  
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const content = await fs.readFile(( './public/app/mainpage.html'), 'utf-8');
    res.send(content);
  } catch (err) {
    res.status(500).send('Error en Mainpage.');
  }
});



app.get('/login', async (req, res) => {
    try {
      const content = await fs.readFile(('./public/app/login.html'), 'utf-8');
      res.send(content);
    } catch (err) {
      res.status(500).send('Error en Introduccion.');
    }
});

app.get('/booking', async (req, res) => {
    try {
      const content = await fs.readFile(('./public/app/booking.html'), 'utf-8');
      res.send(content);
    } catch (err) {
      res.status(500).send('Error en Introduccion.');
    }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});