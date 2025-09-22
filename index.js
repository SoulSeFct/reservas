import express from "express";
import { promises as fs } from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
import { addReservation, getReservations } from "./firebase/firebase.js";

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

app.post("/api/reservas/mesa", async (req, res) => {
    const { mesa } = req.body;
    if (reservas.length === 0) return res.json({ status: 0, msg: "No hay reserva previa" });

    reservas[reservas.length - 1].mesa = mesa;
    console.log("Reserva actualizada con mesa:", reservas[reservas.length - 1]);
    const result = await addReservation(reservas)
    if (result.success === true) {
    res.json({ status: 1, id: result.id });
  } else {
    console.log(result)
    console.error("Error base de datos:", result.error);
    res.status(500).json({ status: 0, error: result.error });
}
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});