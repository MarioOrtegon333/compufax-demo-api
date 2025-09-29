
require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./config/db');
const clientesRoutes = require('./routes/clientes.routes');
const direccionesRoutes = require('./routes/direcciones.routes');
const ordenesRoutes = require('./routes/ordenes.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/clientes', clientesRoutes);
app.use('/direcciones', direccionesRoutes);
app.use('/ordenes', ordenesRoutes);

app.get('/', (req, res) => res.send('API Compufax Demo'));

const PORT = process.env.PORT || 3000;
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

app.use(errorHandler);
