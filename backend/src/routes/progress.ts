import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

function getNextReviewMinutes(score: number, reviewCount: number): number {
  const intervals: Record<number, number> = {
    1: 1,
    2: 10,
    3: 60 * 24,
    4: 60 * 24 * 3,
    5: 60 * 24 * 7,
  };
  const base = intervals[score] ?? 60 * 24;
  if (score === 5 && reviewCount > 1) return base * Math.min(reviewCount, 4);
  return base;
}

// POST /api/progress/:vocabId
router.post('/:vocabId', async (req: Request, res: Response) => {
  const { vocabId } = req.params;
  const { score } = req.body as { score: number };

  if (!score || score < 1 || score > 5) {
    return res.status(400).json({ error: 'Score must be between 1 and 5' });
  }

  const existing = await db.execute({
    sql: 'SELECT * FROM progress WHERE vocabulary_id = ?',
    args: [vocabId],
  });
  const row = existing.rows[0];
  const reviewCount = ((row?.review_count as number) ?? 0) + 1;
  const minutes = getNextReviewMinutes(score, reviewCount);

  if (row) {
    await db.execute({
      sql: `UPDATE progress
            SET score = ?, review_count = ?, last_reviewed = datetime('now'),
                next_review = datetime('now', '+' || ? || ' minutes')
            WHERE vocabulary_id = ?`,
      args: [score, reviewCount, minutes, vocabId],
    });
  } else {
    await db.execute({
      sql: `INSERT INTO progress (vocabulary_id, score, review_count, last_reviewed, next_review)
            VALUES (?, ?, ?, datetime('now'), datetime('now', '+' || ? || ' minutes'))`,
      args: [vocabId, score, reviewCount, minutes],
    });
  }

  const updated = await db.execute({
    sql: 'SELECT * FROM progress WHERE vocabulary_id = ?',
    args: [vocabId],
  });
  res.json(updated.rows[0]);
});

// POST /api/progress/reset/all
router.post('/reset/all', async (_req: Request, res: Response) => {
  await db.execute(
    `UPDATE progress SET score = 0, review_count = 0, last_reviewed = NULL, next_review = datetime('now')`
  );
  res.json({ success: true });
});

// DELETE /api/progress/:vocabId
router.delete('/:vocabId', async (req: Request, res: Response) => {
  await db.execute({
    sql: `UPDATE progress SET score = 0, review_count = 0, last_reviewed = NULL, next_review = datetime('now')
          WHERE vocabulary_id = ?`,
    args: [req.params.vocabId],
  });
  res.json({ success: true });
});

export default router;
