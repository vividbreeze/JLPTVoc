import { useState, useCallback } from 'react';
import type { Vocabulary, Settings } from '../types';
import { fetchQuizWord, submitScore } from '../api/client';

export type QuizState = 'loading' | 'question' | 'answer' | 'empty' | 'error';

export function useQuiz(settings: Settings) {
  const [current, setCurrent] = useState<Vocabulary | null>(null);
  const [state, setState] = useState<QuizState>('loading');
  const [streak, setStreak] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  const loadNext = useCallback(async () => {
    setState('loading');
    try {
      const words = await fetchQuizWord(settings.selectedCategory);
      if (!words || words.length === 0) {
        setState('empty');
        setCurrent(null);
      } else {
        setCurrent(words[0]);
        setState('question');
      }
    } catch {
      setState('error');
    }
  }, [settings.selectedCategory]);

  const reveal = useCallback(() => {
    if (state === 'question') setState('answer');
  }, [state]);

  const rate = useCallback(async (score: number) => {
    if (!current) return;
    await submitScore(current.id, score);
    setSessionCount(c => c + 1);
    if (score >= 4) setStreak(s => s + 1);
    else setStreak(0);
    loadNext();
  }, [current, loadNext]);

  return { current, state, streak, sessionCount, loadNext, reveal, rate };
}
