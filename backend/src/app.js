const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks', taskRoutes);

// TODO (Sumit): mount /api/auth routes here once auth.routes.js is ready
// TODO (Sumit): mount health.routes.js here once it has real content

app.use(errorHandler);

module.exports = app;
