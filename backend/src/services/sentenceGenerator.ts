import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generateSentence(
  japanese: string,
  german: string
): Promise<{ jp: string; de: string }> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 150,
    messages: [
      {
        role: 'user',
        content: `Erstelle einen sehr einfachen japanischen Beispielsatz mit dem Wort "${japanese}" (${german}).

Regeln:
- Nur JLPT N5 Vokabular und Grammatik
- Kurz (max. 15 Zeichen auf Japanisch)
- Natürlich und alltagsnah
- Kanji nur auf N5-Niveau

Antworte NUR mit JSON, kein weiterer Text: {"jp": "...", "de": "..."}`,
      },
    ],
  });

  const text = (message.content[0] as { type: string; text: string }).text.trim();
  const parsed = JSON.parse(text);
  return { jp: parsed.jp, de: parsed.de };
}
