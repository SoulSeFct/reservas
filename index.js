import express from "express";
import { promises as fs } from "fs";
import dotenv from "dotenv";
dotenv.config();
import { addReservation, getReservations } from "./firebase/firebase.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// --- Páginas ---
app.get('/', async (req, res) => {
    try {
        const content = await fs.readFile('./public/app/mainpage.html', 'utf-8');
        res.send(content);
    } catch (err) {
        res.status(500).send('Error en Mainpage.');
    }
});

app.get('/tables', async (req, res) => {
    try {
        const content = await fs.readFile('./public/app/tables.html', 'utf-8');
        res.send(content);
    } catch (err) {
        res.status(500).send('Error en Tables.');
    }
});

app.get('/booking', async (req, res) => {
    try {
        const content = await fs.readFile('./public/app/booking.html', 'utf-8');
        res.send(content);
    } catch (err) {
        res.status(500).send('Error en Booking.');
    }
});

// --- Reservas temporales ---
let reservas = [];

// Crear una reserva (solo fecha, tiempo, correo)
app.post("/api/reservas", async (req, res) => {
    const { fecha, tiempo, correo, nombre } = req.body;

    // Traer todas las reservas existentes
    let todasLasReservas = await getReservations();

    // Verificar duplicados
    const existeDuplicado = todasLasReservas.some(r => {
        const datos = r['0'] || r;
        return datos && datos.fecha === fecha && datos.tiempo === tiempo && datos.correo === correo;
    });

    if (existeDuplicado) {
        return res.json({ status: 2, message: "Ya tienes una reserva para esta fecha y hora" });
    }

    // Guardar temporalmente
    reservas.push({ fecha, tiempo, correo, nombre });

    res.json({ status: 1, fecha, tiempo });
});

// Obtener mesas ocupadas para una fecha y hora
app.get("/getmesasdone", async (req, res) => {
    try {
        const { fecha, tiempo } = req.query;
        if (!fecha || !tiempo) return res.json([]);

        const all = await getReservations();
        const mesasOcupadas = [];

        for (const r of all) {
            const datosReserva = r['0'] || r;
            if (!datosReserva) continue;

            if (String(datosReserva.fecha) === String(fecha) &&
                String(datosReserva.tiempo) === String(tiempo)) {
                if (datosReserva.mesa) mesasOcupadas.push(datosReserva.mesa);
            }
        }

        res.json(mesasOcupadas);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo mesas");
    }
});

// Seleccionar mesa para la última reserva creada
app.post("/api/reservas/mesa", async (req, res) => {
    const { mesa } = req.body;
    if (reservas.length === 0) return res.json({ status: 0, msg: "No hay reserva previa" });

    // Asignar mesa a la última reserva
    reservas[reservas.length - 1].mesa = mesa;

    const result = await addReservation(reservas);
    if (result.success === true) {
        const ultimaReserva = reservas[reservas.length - 1];
        // Limpiar temporal
        reservas = [];
        res.json({ status: 1, final: [ultimaReserva] });
    } else {
        console.error("Error base de datos:", result.error);
        res.status(500).json({ status: 0, error: result.error });
    }
});

// Endpoint para obtener todas las reservas
app.get("/api/reservas/all", async (req, res) => {
    try {
        const all = await getReservations();
        const reservasSimplificadas = all.map(r => {
            const datos = r['0'] || r;
            return {
                correo: datos.correo,
                fecha: datos.fecha,
                tiempo: datos.tiempo,
                mesa: datos.mesa || "-"
            };
        });
        res.json(reservasSimplificadas);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error obteniendo reservas");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
