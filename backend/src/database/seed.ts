import db, { initDb } from './db';
import { vocabulary } from './vocabularyData';

export interface VocabEntry {
  japanese: string;
  hiragana: string;
  romaji: string;
  german: string;
  category: string;
  example_jp?: string;
  example_romaji?: string;
  example_de?: string;
}

export async function seed(): Promise<void> {
  await initDb();

  // V6 migration: add example_romaji column if missing
  try {
    await db.execute('ALTER TABLE vocabulary ADD COLUMN example_romaji TEXT');
    console.log('🌸 V6: Spalte example_romaji hinzugefügt.');
  } catch {
    // Column already exists — that's fine
  }

  // V7 migration: replace with new vocabulary list (CSV V4)
  // Triggered by any category from the old structure that no longer exists in the new list
  const hasOldData = await db.execute(
    "SELECT COUNT(*) as c FROM vocabulary WHERE category IN ('Smalltalk','Zuhause','Zeitdauer','Wochentage','Hotel','Sonstiges')"
  );
  if (Number(hasOldData.rows[0]?.c ?? 0) > 0) {
    await db.execute('DELETE FROM progress');
    await db.execute('DELETE FROM vocabulary');
    console.log('🌸 V7: Neue Vokabelliste (CSV V4) wird geladen...');
  }

  // Incremental insert — skip if (japanese, hiragana, german) already exists
  let added = 0;
  for (const entry of vocabulary) {
    const exists = await db.execute({
      sql: 'SELECT id FROM vocabulary WHERE japanese = ? AND hiragana = ? AND german = ?',
      args: [entry.japanese, entry.hiragana, entry.german],
    });
    if (exists.rows.length === 0) {
      const result = await db.execute({
        sql: `INSERT INTO vocabulary (japanese, hiragana, romaji, german, category, example_jp, example_de, example_romaji) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [entry.japanese, entry.hiragana, entry.romaji, entry.german, entry.category, entry.example_jp ?? null, entry.example_de ?? null, entry.example_romaji ?? null],
      });
      await db.execute({
        sql: `INSERT OR IGNORE INTO progress (vocabulary_id, score, review_count, next_review) VALUES (?, 0, 0, datetime('now'))`,
        args: [result.lastInsertRowid ?? 0],
      });
      added++;
    }
  }

  const total = (await db.execute('SELECT COUNT(*) as c FROM vocabulary')).rows[0]?.c;
  console.log(`🌸 ${added} neue Einträge hinzugefügt. Gesamt: ${total}.`);
}
