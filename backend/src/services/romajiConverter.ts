/* eslint-disable @typescript-eslint/no-explicit-any */
// kuroshiro + kuromoji: converts Japanese text (kanji + kana) to Hepburn romaji
// Lazily initialised so the ~8 MB dictionary is only loaded once.

let kuroshiroInstance: any = null;
let initPromise: Promise<void> | null = null;

async function getKuroshiro(): Promise<any> {
  if (kuroshiroInstance) return kuroshiroInstance;
  if (initPromise) { await initPromise; return kuroshiroInstance; }

  initPromise = (async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Kuroshiro = require('kuroshiro').default ?? require('kuroshiro');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

    const k = new Kuroshiro();
    await k.init(new KuromojiAnalyzer());
    kuroshiroInstance = k;
  })();

  await initPromise;
  return kuroshiroInstance;
}

export async function toRomaji(text: string): Promise<string> {
  try {
    const k = await getKuroshiro();
    const raw: string = await k.convert(text, { to: 'romaji', mode: 'spaced', romajiSystem: 'hepburn' });
    return raw
      // Remove spaces before punctuation
      .replace(/\s+([.,!?。、！？…])/g, '$1')
      // Convert macron vowels to plain ASCII (learner-friendly)
      .replace(/ā/g, 'a').replace(/ī/g, 'i').replace(/ū/g, 'u').replace(/ē/g, 'e').replace(/ō/g, 'o')
      .replace(/Ā/g, 'A').replace(/Ī/g, 'I').replace(/Ū/g, 'U').replace(/Ē/g, 'E').replace(/Ō/g, 'O')
      .trim();
  } catch {
    return text; // fallback: return original if conversion fails
  }
}
