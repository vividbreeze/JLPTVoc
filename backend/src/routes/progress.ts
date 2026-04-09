import { Router, Request, Response } from 'express';
import db from '../database/db';

const router = Router();

// Spaced repetition: minutes until next review based on score
function getNextReviewMinutes(score: number, reviewCount: number): number {
  const intervals: Record<number, number> = {
    1: 1,          // 1 minute  - überhaupt nicht
    2: 10,         // 10 minutes - kaum
    3: 60 * 24,    // 1 day    - fast
    4: 60 * 24 * 3, // 3 days  - gut
    5: 60 * 24 * 7, // 7 days  - perfekt (first time)
  };
  const base = intervals[score] ?? 60 * 24;
  // Grow interval for repeatedly mastered words
  if (score === 5 && reviewCount > 1) {
    return base * Math.min(reviewCount, 4);
  }
  return base;
}

// POST /api/progress/:vocabId - update progress for a word
router.post('/:vocabId', (req: Request, res: Response) => {
  const { vocabId } = req.params;
  const { score } = req.body as { score: number };

  if (!score || score < 1 || score > 5) {
    return res.status(400).json({ error: 'Score must be between 1 and 5' });
  }

  const existing = db.prepare('SELECT * FROM progress WHERE vocabulary_id = ?').get(vocabId) as
    { id: number; score: number; review_count: number } | undefined;

  const reviewCount = (existing?.review_count ?? 0) + 1;
  const minutes = getNextReviewMinutes(score, reviewCount);

  if (existing) {
    db.prepare(`
      UPDATE progress
      SET score = ?, review_count = ?, last_reviewed = CURRENT_TIMESTAMP,
          next_review = datetime('now', '+' || ? || ' minutes')
      WHERE vocabulary_id = ?
    `).run(score, reviewCount, minutes, vocabId);
  } else {
    db.prepare(`
      INSERT INTO progress (vocabulary_id, score, review_count, last_reviewed, next_review)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, datetime('now', '+' || ? || ' minutes'))
    `).run(vocabId, score, reviewCount, minutes);
  }

  const updated = db.prepare('SELECT * FROM progress WHERE vocabulary_id = ?').get(vocabId);
  res.json(updated);
});

// DELETE /api/progress/:vocabId - reset progress for a word
router.delete('/:vocabId', (req: Request, res: Response) => {
  db.prepare(`
    UPDATE progress SET score = 0, review_count = 0, last_reviewed = NULL, next_review = CURRENT_TIMESTAMP
    WHERE vocabulary_id = ?
  `).run(req.params.vocabId);
  res.json({ success: true });
});

// POST /api/progress/reset-all - reset all progress
router.post('/reset/all', (_req: Request, res: Response) => {
  db.prepare(`
    UPDATE progress SET score = 0, review_count = 0, last_reviewed = NULL, next_review = CURRENT_TIMESTAMP
  `).run();
  res.json({ success: true });
});

export default router;
