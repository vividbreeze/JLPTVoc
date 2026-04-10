/**
 * One-time script: generates JLPT N5 example sentences for all vocabulary entries
 * and writes them back into seed.ts.
 *
 * Run once: npx ts-node scripts/generateSentences.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SEED_PATH = path.join(__dirname, '../src/database/seed.ts');
const BATCH_SIZE = 20;

interface VocabEntry {
  japanese: string;
  german: string;
}

async function generateBatch(
  batch: VocabEntry[]
): Promise<{ japanese: string; jp: string; de: string }[]> {
  const list = batch
    .map((v, i) => `${i + 1}. "${v.japanese}" (${v.german})`)
    .join('\n');

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `Erstelle für jedes der folgenden ${batch.length} japanischen Wörter einen kurzen, einfachen Beispielsatz.

Regeln:
- Nur JLPT N5 Vokabular und Grammatik
- Max. 15 Zeichen auf Japanisch
- Natürlich und alltagsnah
- Das Zielwort MUSS im Satz vorkommen

Wörter:
${list}

Antworte NUR mit einem JSON-Array, kein weiterer Text:
[{"japanese":"...","jp":"...","de":"..."}, ...]`,
      },
    ],
  });

  const text = (msg.content[0] as { text: string }).text.trim();
  // Extract JSON array even if wrapped in markdown code block
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error(`Unexpected response: ${text.slice(0, 200)}`);
  return JSON.parse(match[0]);
}

async function main() {
  let seedContent = fs.readFileSync(SEED_PATH, 'utf-8');

  // Extract all vocabulary entries that don't yet have example_jp
  const entryRegex =
    /\{ japanese: '([^']+)', hiragana: '[^']*', romaji: '[^']*', german: '([^']+)', category: '[^']*' \}/g;

  const entries: VocabEntry[] = [];
  let match: RegExpExecArray | null;
  while ((match = entryRegex.exec(seedContent)) !== null) {
    entries.push({ japanese: match[1], german: match[2] });
  }

  console.log(`📚 ${entries.length} Einträge gefunden`);

  let updated = 0;
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    console.log(`⏳ Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(entries.length / BATCH_SIZE)} (${batch.length} Wörter)…`);

    try {
      const results = await generateBatch(batch);

      for (const result of results) {
        if (!result.japanese || !result.jp || !result.de) continue;

        // Escape single quotes in the generated sentences
        const jpEscaped = result.jp.replace(/'/g, "\\'");
        const deEscaped = result.de.replace(/'/g, "\\'");

        // Replace the matching entry to add example fields
        const escapedJapanese = result.japanese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(
          `(\\{ japanese: '${escapedJapanese}', hiragana: '[^']*', romaji: '[^']*', german: '[^']*', category: '([^']*)')( \\})`,
          'g'
        );

        const replacement = `$1, example_jp: '${jpEscaped}', example_de: '${deEscaped}'$3`;
        const newContent = seedContent.replace(pattern, replacement);

        if (newContent !== seedContent) {
          seedContent = newContent;
          updated++;
        }
      }
    } catch (err) {
      console.error(`❌ Batch-Fehler:`, err);
    }

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  fs.writeFileSync(SEED_PATH, seedContent, 'utf-8');
  console.log(`✅ Fertig! ${updated}/${entries.length} Einträge aktualisiert.`);
}

main().catch(console.error);
