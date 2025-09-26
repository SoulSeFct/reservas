# Sistema de Reservas - Baúl de Kiwis 🥝

Un sistema de reservas moderno y eficiente para restaurantes, desarrollado con Node.js y Firebase. Permite a los usuarios realizar reservas en línea, visualizar la disponibilidad de mesas en tiempo real y gestionar las reservaciones de manera intuitiva.

## Características ✨

- Interfaz de usuario intuitiva y responsive
- Selección visual de mesas mediante un mapa interactivo
- Sistema de prevención de reservas duplicadas
- Validación de fechas y horarios
- Visualización de reservas activas
- Intervalo de reservas de 30 minutos
- Horario configurable (9:00 AM - 8:00 PM por defecto)

## Tecnologías Utilizadas 🛠️

- Node.js
- Express.js
- Firebase (Firestore)
- HTML5
- CSS3
- JavaScript (Vanilla)
- SVG para el mapa de mesas

## Requisitos Previos 📋

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Cuenta de Firebase
- Git (opcional, para clonar el repositorio)

## Configuración del Proyecto 🚀

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SoulSeFct/reservas.git
   cd reservas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Ir a Project Settings > General
   - Crear una nueva aplicación web
   - Copiar las credenciales de configuración

4. **Configurar variables de entorno**
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar las siguientes variables:
   ```env
   FIREBASE_API_KEY=tu_api_key
   FIREBASE_AUTH_DOMAIN=tu_auth_domain
   FIREBASE_PROJECT_ID=tu_project_id
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   FIREBASE_APP_ID=tu_app_id
   ```

5. **Configurar Firestore**
   - En Firebase Console, ir a Firestore Database
   - Crear una nueva base de datos
   - Iniciar en modo de prueba o producción según necesidades

## Estructura del Proyecto 📁

```
reservas/
├── firebase/
│   └── firebase.js     # Configuración de Firebase
├── public/
│   ├── app/           # Páginas HTML
│   ├── css/           # Estilos
│   ├── js/           # Scripts del cliente
│   └── src/          # Recursos (imágenes, etc.)
├── .env              # Variables de entorno
├── .gitignore        # Archivos ignorados por git
├── index.js          # Servidor Express
└── package.json      # Dependencias y scripts
```

## Ejecución del Proyecto ▶️

1. **Desarrollo local**
   ```bash
   npm start
   ```
   El servidor se iniciará en `http://localhost:3000`

2. **Producción**
   - Configurar las variables de entorno en tu servidor
   - Ejecutar con PM2 o similar:
   ```bash
   pm2 start index.js --name reservas
   ```

## Personalización 🎨

### Horarios de Reserva
Modifica los valores en `booking.html`:
```javascript
input type="time" min="09:00" max="20:00" step="1800"
```

### Diseño de Mesas
El mapa de mesas se encuentra en `tables.html` como SVG. Puedes modificar:
- Posición de mesas: Editar coordenadas x, y
- Tamaño: Modificar width, height
- Estilo: Ajustar stroke, fill, etc.

### Estilos
Los estilos se encuentran en la carpeta `public/css/`:
- `mainpage.css`: Página principal
- `booking.css`: Formulario de reservas
- `tables.css`: Mapa de mesas

## Seguridad 🔒

- Implementar autenticación según necesidades
- Configurar reglas de Firestore apropiadamente
- Mantener las API keys seguras
- Validar todas las entradas de usuario

## Contribuir 🤝

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## Contacto 📧

Tu Nombre - [@tu_twitter](https://twitter.com/tu_usuario)

Link del proyecto: [https://github.com/tu-usuario/reservas](https://github.com/tu-usuario/reservas)
