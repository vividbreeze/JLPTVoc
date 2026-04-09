import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

// GET /api/stats - overall learning stats
router.get('/', (_req: Request, res: Response) => {
  const total = (db.prepare('SELECT COUNT(*) as count FROM vocabulary').get() as { count: number }).count;

  const byScore = db.prepare(`
    SELECT
      COALESCE(p.score, 0) as score,
      COUNT(*) as count
    FROM vocabulary v
    LEFT JOIN progress p ON v.id = p.vocabulary_id
    GROUP BY COALESCE(p.score, 0)
    ORDER BY score
  `).all() as { score: number; count: number }[];

  const dueCount = (db.prepare(`
    SELECT COUNT(*) as count FROM vocabulary v
    LEFT JOIN progress p ON v.id = p.vocabulary_id
    WHERE (p.next_review IS NULL OR p.next_review <= datetime('now'))
  `).get() as { count: number }).count;

  const masteredCount = (db.prepare(`
    SELECT COUNT(*) as count FROM progress WHERE score = 5
  `).get() as { count: number }).count;

  const byCategory = db.prepare(`
    SELECT
      v.category,
      COUNT(*) as total,
      SUM(CASE WHEN p.score = 5 THEN 1 ELSE 0 END) as mastered,
      AVG(COALESCE(p.score, 0)) as avg_score
    FROM vocabulary v
    LEFT JOIN progress p ON v.id = p.vocabulary_id
    GROUP BY v.category
    ORDER BY v.category
  `).all();

  res.json({ total, dueCount, masteredCount, byScore, byCategory });
});

export default router;
