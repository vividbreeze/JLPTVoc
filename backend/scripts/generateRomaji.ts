/**
 * One-time script: generates Hepburn romaji for all example_jp sentences
 * that don't yet have example_romaji, and writes them back into seed.ts.
 *
 * Run once: npx ts-node scripts/generateRomaji.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const SEED_PATH = path.join(__dirname, '../src/database/seed.ts');
const BATCH_SIZE = 30;

async function getRomajiBatch(sentences: string[]): Promise<string[]> {
  const list = sentences.map((s, i) => `${i + 1}. ${s}`).join('\n');

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Transliterate each Japanese sentence below into Hepburn romaji (all kanji, hiragana and katakana → romaji). Keep punctuation like commas and periods.

Sentences:
${list}

Reply ONLY with a JSON array of strings in the same order, no extra text:
["romaji 1", "romaji 2", ...]`,
      },
    ],
  });

  const text = (msg.content[0] as { text: string }).text.trim();
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error(`Unexpected response: ${text.slice(0, 200)}`);
  const result = JSON.parse(match[0]) as string[];
  if (result.length !== sentences.length) {
    throw new Error(`Expected ${sentences.length} results, got ${result.length}`);
  }
  return result;
}

async function main() {
  let seedContent = fs.readFileSync(SEED_PATH, 'utf-8');

  // Find all entries that have example_jp but NOT example_romaji
  const entryRegex = /example_jp: '((?:[^'\\]|\\.)*)', example_de: '(?:[^'\\]|\\.)*' \}/g;

  const toProcess: { jp: string; index: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(seedContent)) !== null) {
    const jp = m[1];
    // Skip if example_romaji already present right after this entry
    const after = seedContent.slice(m.index, m.index + m[0].length + 60);
    if (!after.includes('example_romaji')) {
      toProcess.push({ jp, index: m.index });
    }
  }

  console.log(`📚 ${toProcess.length} Sätze ohne Romaji gefunden`);

  const sentences = toProcess.map(e => e.jp);
  const allRomaji: string[] = [];

  for (let i = 0; i < sentences.length; i += BATCH_SIZE) {
    const batch = sentences.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(sentences.length / BATCH_SIZE);
    console.log(`⏳ Batch ${batchNum}/${totalBatches} (${batch.length} Sätze)…`);

    try {
      const results = await getRomajiBatch(batch);
      allRomaji.push(...results);
    } catch (err) {
      console.error(`❌ Batch-Fehler:`, err);
      // Fill with empty strings so indices stay aligned
      allRomaji.push(...batch.map(() => ''));
    }

    await new Promise(r => setTimeout(r, 300));
  }

  // Now update seed content: replace `example_de: 'X' }` with `example_de: 'X', example_romaji: 'Y' }`
  // We do this by matching example_jp value to find the right entry
  let updated = 0;
  for (let i = 0; i < toProcess.length; i++) {
    const { jp } = toProcess[i];
    const romaji = allRomaji[i];
    if (!romaji) continue;

    const escapedJp = jp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const romajiEscaped = romaji.replace(/'/g, "\\'");

    const pattern = new RegExp(
      `(example_jp: '${escapedJp}', example_de: '(?:[^'\\\\]|\\\\.)*')( \\})`,
      'g'
    );

    const newContent = seedContent.replace(pattern, `$1, example_romaji: '${romajiEscaped}'$2`);
    if (newContent !== seedContent) {
      seedContent = newContent;
      updated++;
    }
  }

  fs.writeFileSync(SEED_PATH, seedContent, 'utf-8');
  console.log(`✅ Fertig! ${updated}/${toProcess.length} Einträge aktualisiert.`);
}

main().catch(console.error);
