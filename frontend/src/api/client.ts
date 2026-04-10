import axios from 'axios';
import type { Vocabulary, Category, Stats } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchCategories = (): Promise<Category[]> =>
  api.get('/vocabulary/categories').then(r => r.data);

export const fetchQuizWord = (category?: string | null): Promise<Vocabulary[]> => {
  const params = category ? { category } : {};
  return api.get('/vocabulary/quiz', { params }).then(r => r.data);
};

export const submitScore = (vocabId: number, score: number): Promise<void> =>
  api.post(`/progress/${vocabId}`, { score }).then(r => r.data);

export const fetchStats = (): Promise<Stats> =>
  api.get('/stats').then(r => r.data);

export const resetAllProgress = (): Promise<void> =>
  api.post('/progress/reset/all').then(r => r.data);

export const fetchSentence = (id: number): Promise<{ jp: string; de: string; romaji: string }> =>
  api.get(`/vocabulary/${id}/sentence`).then(r => r.data);
