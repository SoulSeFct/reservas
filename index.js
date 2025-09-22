const express = require('express');
const fs = require('fs').promises;  
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const content = await fs.readFile(( './public/app/mainpage.html'), 'utf-8');
    res.send(content);
  } catch (err) {
    res.status(500).send('Error en Mainpage.');
  }
});



app.get('/tables', async (req, res) => {
    try {
      const content = await fs.readFile(('./public/app/tables.html'), 'utf-8');
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

let reservas = [];

app.post("/api/reservas", (req, res) => {
    reservas = [];
    reservas.push(req.body);
    console.log("Datos recibidos:", req.body);
    res.json({ status: 1 });
});

app.post("/api/reservas/mesa", (req, res) => {
    const { mesa } = req.body;
    if (reservas.length === 0) return res.json({ status: 0, msg: "No hay reserva previa" });

    reservas[reservas.length - 1].mesa = mesa;
    console.log("Reserva actualizada con mesa:", reservas[reservas.length - 1]);
    res.json({ status: 1 });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});