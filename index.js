const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./resources/files/swagger.json');
const db = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir solicitudes de diferentes dominios
const corsOptions = {
  origin: 'https://frontluis.vercel.app',
  optionsSuccessStatus: 200 // Para algunos navegadores antiguos
};

app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para servir la documentación Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas para manejar solicitudes relacionadas con equipos y usuarios
app.use('/books', teamRoutes);
app.use('/user', userRoutes);

// Manejo de errores de conexión a la base de datos
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Ruta de prueba para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API is working');
});

// Manejo de preflight requests
app.options('*', cors(corsOptions));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
