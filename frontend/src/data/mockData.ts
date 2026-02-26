import type { Language } from '../types';

export const languages: Language[] = [
  { id: 'mock-en', code: 'EN', name: 'English',    flag: '🇬🇧', status: 'active', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-uk', code: 'UK', name: 'Ukrainian',  flag: '🇺🇦', status: 'active', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-de', code: 'DE', name: 'German',     flag: '🇩🇪', status: 'active', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-fr', code: 'FR', name: 'French',     flag: '🇫🇷', status: 'active', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-es', code: 'ES', name: 'Spanish',    flag: '🇪🇸', status: 'active', createdAt: '2026-01-01T00:00:00.000Z' },
];
