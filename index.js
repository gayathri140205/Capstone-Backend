import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import AppRoutes from './src/routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 2002; // Use the PORT environment variable if set, otherwise default to 10000

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', AppRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
