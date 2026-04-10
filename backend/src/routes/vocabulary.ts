import { Router, Request, Response } from 'express';
import db from '../database/db';
import { generateSentence } from '../services/sentenceGenerator';
import { toRomaji } from '../services/romajiConverter';

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

// GET /api/vocabulary/:id/sentence — fetch cached or generate via Claude
router.get('/:id/sentence', async (req: Request, res: Response) => {
  try {
    const row = await db.execute({
      sql: 'SELECT id, japanese, german, example_jp, example_de, example_romaji FROM vocabulary WHERE id = ?',
      args: [req.params.id],
    });
    if (!row.rows[0]) return res.status(404).json({ error: 'Not found' });

    const vocab = row.rows[0] as unknown as {
      id: number; japanese: string; german: string;
      example_jp: string | null; example_de: string | null; example_romaji: string | null;
    };

    let jp = vocab.example_jp;
    let de = vocab.example_de;
    let romaji = vocab.example_romaji;

    // Generate sentence via Claude if not cached
    if (!jp || !de) {
      const sentence = await generateSentence(vocab.japanese, vocab.german);
      jp = sentence.jp;
      de = sentence.de;
    }

    // Generate romaji if not cached
    if (!romaji && jp) {
      romaji = await toRomaji(jp);
    }

    // Persist any newly generated values
    if (jp !== vocab.example_jp || de !== vocab.example_de || romaji !== vocab.example_romaji) {
      await db.execute({
        sql: 'UPDATE vocabulary SET example_jp = ?, example_de = ?, example_romaji = ? WHERE id = ?',
        args: [jp, de, romaji, vocab.id],
      });
    }

    res.json({ jp, de, romaji });
  } catch (err) {
    console.error('Sentence generation error:', err);
    res.status(500).json({ error: 'Could not generate sentence' });
  }
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
