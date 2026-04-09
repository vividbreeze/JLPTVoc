import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const [totalRes, byScoreRes, dueRes, masteredRes, byCategoryRes] = await Promise.all([
    db.execute('SELECT COUNT(*) as count FROM vocabulary'),
    db.execute(`
      SELECT COALESCE(p.score, 0) as score, COUNT(*) as count
      FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
      GROUP BY COALESCE(p.score, 0) ORDER BY score
    `),
    db.execute(`
      SELECT COUNT(*) as count FROM vocabulary v
      LEFT JOIN progress p ON v.id = p.vocabulary_id
      WHERE (p.next_review IS NULL OR p.next_review <= datetime('now'))
    `),
    db.execute('SELECT COUNT(*) as count FROM progress WHERE score = 5'),
    db.execute(`
      SELECT v.category, COUNT(*) as total,
        SUM(CASE WHEN p.score = 5 THEN 1 ELSE 0 END) as mastered,
        AVG(COALESCE(p.score, 0)) as avg_score
      FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
      GROUP BY v.category ORDER BY v.category
    `),
  ]);

  res.json({
    total: totalRes.rows[0]?.count ?? 0,
    dueCount: dueRes.rows[0]?.count ?? 0,
    masteredCount: masteredRes.rows[0]?.count ?? 0,
    byScore: byScoreRes.rows,
    byCategory: byCategoryRes.rows,
  });
});

export default router;
