import type { Version, Translation, Language } from '../types';

export const languages: Language[] = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'UK', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'DE', name: 'German', flag: '🇩🇪' },
  { code: 'FR', name: 'French', flag: '🇫🇷' },
  { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
];

export const versions: Version[] = [
  { id: '1', name: 'v1.0', status: 'published', createdDate: '2026-01-15' },
  { id: '2', name: 'v1.1', status: 'published', createdDate: '2026-01-28' },
  { id: '3', name: 'v1.2', status: 'draft', createdDate: '2026-02-10' },
  { id: '4', name: 'v2.0', status: 'draft', createdDate: '2026-02-15' },
];

export const translations: Translation[] = [
  // English v1.2
  { key: 'login_title', value: 'Welcome Back', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'login_subtitle', value: 'Sign in to your account', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'dashboard_welcome', value: 'Welcome to your dashboard', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'dashboard_empty_state', value: 'No data available', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'button_save', value: 'Save', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'button_cancel', value: 'Cancel', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'button_delete', value: 'Delete', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'error_required_field', value: 'This field is required', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'error_network', value: 'Network error. Please try again', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'navigation_home', value: 'Home', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'navigation_settings', value: 'Settings', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  { key: 'settings_profile', value: 'Profile Settings', lastUpdated: '2026-02-10', status: 'translated', language: 'EN', version: 'v1.2' },
  
  // Ukrainian v1.2
  { key: 'login_title', value: 'Ласкаво просимо', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'login_subtitle', value: 'Увійдіть у свій обліковий запис', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'dashboard_welcome', value: 'Ласкаво просимо на вашу панель', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'dashboard_empty_state', value: '', lastUpdated: '2026-02-11', status: 'missing', language: 'UK', version: 'v1.2' },
  { key: 'button_save', value: 'Зберегти', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'button_cancel', value: 'Скасувати', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'button_delete', value: '', lastUpdated: '2026-02-11', status: 'missing', language: 'UK', version: 'v1.2' },
  { key: 'error_required_field', value: "Це поле обов'язкове", lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'error_network', value: '', lastUpdated: '2026-02-11', status: 'missing', language: 'UK', version: 'v1.2' },
  { key: 'navigation_home', value: 'Головна', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'navigation_settings', value: 'Налаштування', lastUpdated: '2026-02-11', status: 'translated', language: 'UK', version: 'v1.2' },
  { key: 'settings_profile', value: '', lastUpdated: '2026-02-11', status: 'missing', language: 'UK', version: 'v1.2' },
  
  // German v1.2
  { key: 'login_title', value: 'Willkommen zurück', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'login_subtitle', value: 'Melden Sie sich bei Ihrem Konto an', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'dashboard_welcome', value: 'Willkommen zu Ihrem Dashboard', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'dashboard_empty_state', value: 'Keine Daten verfügbar', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'button_save', value: 'Speichern', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'button_cancel', value: 'Abbrechen', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'button_delete', value: 'Löschen', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'error_required_field', value: 'Dieses Feld ist erforderlich', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'error_network', value: '', lastUpdated: '2026-02-12', status: 'missing', language: 'DE', version: 'v1.2' },
  { key: 'navigation_home', value: 'Startseite', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'navigation_settings', value: 'Einstellungen', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },
  { key: 'settings_profile', value: 'Profileinstellungen', lastUpdated: '2026-02-12', status: 'translated', language: 'DE', version: 'v1.2' },

  // English v1.1
  { key: 'login_title', value: 'Welcome', lastUpdated: '2026-01-28', status: 'translated', language: 'EN', version: 'v1.1' },
  { key: 'login_subtitle', value: 'Please sign in', lastUpdated: '2026-01-28', status: 'translated', language: 'EN', version: 'v1.1' },
  { key: 'dashboard_welcome', value: 'Dashboard', lastUpdated: '2026-01-28', status: 'translated', language: 'EN', version: 'v1.1' },
  { key: 'button_save', value: 'Save', lastUpdated: '2026-01-28', status: 'translated', language: 'EN', version: 'v1.1' },
  { key: 'button_cancel', value: 'Cancel', lastUpdated: '2026-01-28', status: 'translated', language: 'EN', version: 'v1.1' },
];
