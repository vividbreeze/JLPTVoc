export interface Vocabulary {
  id: number;
  japanese: string;
  hiragana: string;
  romaji: string;
  german: string;
  category: string;
  jlpt_level: string;
  example_jp?: string;
  example_de?: string;
  // progress fields (joined)
  score?: number;
  review_count?: number;
  next_review?: string;
  last_reviewed?: string;
}

export interface Category {
  category: string;
  count: number;
}

export interface Stats {
  total: number;
  dueCount: number;
  masteredCount: number;
  byScore: { score: number; count: number }[];
  byCategory: {
    category: string;
    total: number;
    mastered: number;
    avg_score: number;
  }[];
}

export type QuizMode = 'de-to-jp' | 'jp-to-de';
export type DisplayMode = 'hiragana' | 'romaji' | 'both';

export interface Settings {
  quizMode: QuizMode;
  displayMode: DisplayMode;
  selectedCategory: string | null;
}
