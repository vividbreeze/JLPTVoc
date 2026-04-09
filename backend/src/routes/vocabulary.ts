import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

// GET /api/vocabulary - all vocabulary with optional category filter
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  const query = category
    ? 'SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id WHERE v.category = ?'
    : 'SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id ORDER BY v.category';

  const rows = category
    ? db.prepare(query).all(category as string)
    : db.prepare(query).all();

  res.json(rows);
});

// GET /api/vocabulary/categories - all categories
router.get('/categories', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT DISTINCT category, COUNT(*) as count FROM vocabulary GROUP BY category ORDER BY category').all();
  res.json(rows);
});

// GET /api/vocabulary/quiz - get next word(s) to review
router.get('/quiz', (req: Request, res: Response) => {
  const { category, mode } = req.query;
  const limit = parseInt(req.query.limit as string || '1', 10);

  let query = `
    SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
    FROM vocabulary v
    LEFT JOIN progress p ON v.id = p.vocabulary_id
    WHERE (p.next_review IS NULL OR p.next_review <= datetime('now'))
    ${category ? "AND v.category = ?" : ""}
    ORDER BY
      CASE WHEN p.score IS NULL THEN 0 ELSE p.score END ASC,
      RANDOM()
    LIMIT ?
  `;

  const params: (string | number)[] = [];
  if (category) params.push(category as string);
  params.push(limit);

  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

// GET /api/vocabulary/:id - single vocabulary entry
router.get('/:id', (req: Request, res: Response) => {
  const row = db.prepare(`
    SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
    FROM vocabulary v
    LEFT JOIN progress p ON v.id = p.vocabulary_id
    WHERE v.id = ?
  `).get(req.params.id);

  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

export default router;
