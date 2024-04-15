import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AppRoutes from './src/routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 10000; // Use the PORT environment variable if set, otherwise default to 10000

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', AppRoutes);

app.listen(PORT, '0.0.0.0', () => console.log(`App is listening on port ${PORT}`)); // Bind host to '0.0.0.0'
