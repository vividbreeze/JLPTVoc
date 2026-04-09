import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDb } from './database/db';
import { seed } from './database/seed';
import vocabularyRoutes from './routes/vocabulary';
import progressRoutes from './routes/progress';
import statsRoutes from './routes/stats';

const app = express();
const PORT = parseInt(process.env.PORT || '3020', 10);

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/stats', statsRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(staticPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

async function start() {
  await initDb();
  await seed();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 JLPT Voc Server running on port ${PORT}`);
  });
}

start().catch(console.error);
