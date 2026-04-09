import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

// GET /api/vocabulary/categories
router.get('/categories', async (_req: Request, res: Response) => {
  const result = await db.execute(
    'SELECT DISTINCT category, COUNT(*) as count FROM vocabulary GROUP BY category ORDER BY category'
  );
  res.json(result.rows);
});

// GET /api/vocabulary/quiz
router.get('/quiz', async (req: Request, res: Response) => {
  const { category } = req.query;

  const sql = category
    ? `SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
       FROM vocabulary v
       LEFT JOIN progress p ON v.id = p.vocabulary_id
       WHERE (p.next_review IS NULL OR p.next_review <= datetime('now'))
         AND v.category = ?
       ORDER BY CASE WHEN p.score IS NULL THEN 0 ELSE p.score END ASC, RANDOM()
       LIMIT 1`
    : `SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
       FROM vocabulary v
       LEFT JOIN progress p ON v.id = p.vocabulary_id
       WHERE (p.next_review IS NULL OR p.next_review <= datetime('now'))
       ORDER BY CASE WHEN p.score IS NULL THEN 0 ELSE p.score END ASC, RANDOM()
       LIMIT 1`;

  const result = await db.execute({ sql, args: category ? [category as string] : [] });
  res.json(result.rows);
});

// GET /api/vocabulary
router.get('/', async (req: Request, res: Response) => {
  const { category } = req.query;

  const sql = category
    ? `SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
       FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
       WHERE v.category = ?`
    : `SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
       FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
       ORDER BY v.category`;

  const result = await db.execute({ sql, args: category ? [category as string] : [] });
  res.json(result.rows);
});

// GET /api/vocabulary/:id
router.get('/:id', async (req: Request, res: Response) => {
  const result = await db.execute({
    sql: `SELECT v.*, p.score, p.review_count, p.next_review, p.last_reviewed
          FROM vocabulary v LEFT JOIN progress p ON v.id = p.vocabulary_id
          WHERE v.id = ?`,
    args: [req.params.id],
  });
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(result.rows[0]);
});

export default router;
