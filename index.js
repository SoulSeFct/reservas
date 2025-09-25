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

app.post("/api/reservas", async (req, res) => {
    reservas = [];
    reservas.push(req.body);
    let todasLasReservas = await getReservations();
    console.log(todasLasReservas)
    
    // Verificar si ya existe una reserva con los mismos datos
    let existeDuplicado = false;

    for (const reservaExistente of todasLasReservas) {
        const datosReserva = reservaExistente['0'];
        if (!datosReserva) continue;
        console.log("Comparando fechas:", {
            fechaExistente: datosReserva.fecha,
            fechaNueva: req.body.fecha,
            tiempoExistente: datosReserva.tiempo,
            tiempoNuevo: req.body.tiempo,
            correoExistente: datosReserva.correo,
            correoNuevo: req.body.correo
        });

        if (String(datosReserva.fecha) === String(req.body.fecha) && 
            String(datosReserva.tiempo) === String(req.body.tiempo) &&
            String(datosReserva.correo) === String(req.body.correo)) {
            existeDuplicado = true;
            console.log("⚠️ Ya existe una reserva con ese correo en esa fecha y hora.");
            break;
        }
    }

    if (existeDuplicado) {
        return res.json({ status: 2, message: "Ya tienes una reserva para esta fecha y hora" });
    }

    res.json({ status: 1 });
});

app.post("/api/reservas/mesa", async (req, res) => {
    const { mesa } = req.body;
    if (reservas.length === 0) return res.json({ status: 0, msg: "No hay reserva previa" });

    reservas[reservas.length - 1].mesa = mesa;
    const result = await addReservation(reservas)
    if (result.success === true) {
    console.log(reservas)
    res.json({ status: 1, id: result.id , final: reservas});
  } else {
    console.log(result)
    console.error("Error base de datos:", result.error);
    res.status(500).json({ status: 0, error: result.error });
}
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});