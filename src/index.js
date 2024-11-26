import express from 'express';
import { config } from 'dotenv';
import { setupRoutes } from './routes/index.js';
import { logger } from './utils/logger.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`Quantum Assistant API running on port ${PORT}`);
});

export default app;