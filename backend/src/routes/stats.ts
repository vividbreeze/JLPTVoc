import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const [totalRes, byScoreRes, dueRes, masteredRes, allVocabRes] = await Promise.all([
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
      SELECT v.category, COALESCE(p.score, 0) as score
      FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
    `),
  ]);

  // Aggregate per category — each word counts towards all its categories
  const catMap = new Map<string, { total: number; mastered: number; scoreSum: number }>();
  for (const row of allVocabRes.rows) {
    const cats = (row.category as string).split(',').map((c: string) => c.trim()).filter(Boolean);
    const score = row.score as number;
    for (const cat of cats) {
      if (!catMap.has(cat)) catMap.set(cat, { total: 0, mastered: 0, scoreSum: 0 });
      const entry = catMap.get(cat)!;
      entry.total++;
      if (score === 5) entry.mastered++;
      entry.scoreSum += score;
    }
  }
  const byCategory = Array.from(catMap.entries())
    .map(([category, { total, mastered, scoreSum }]) => ({
      category, total, mastered, avg_score: total > 0 ? scoreSum / total : 0,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  res.json({
    total: totalRes.rows[0]?.count ?? 0,
    dueCount: dueRes.rows[0]?.count ?? 0,
    masteredCount: masteredRes.rows[0]?.count ?? 0,
    byScore: byScoreRes.rows,
    byCategory,
  });
});

export default router;
