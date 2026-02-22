import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Versions
  await prisma.version.createMany({
    data: [
      { name: 'v1.0', status: 'published', createdAt: new Date('2026-01-15') },
      { name: 'v1.1', status: 'published', createdAt: new Date('2026-01-28') },
      { name: 'v1.2', status: 'draft', createdAt: new Date('2026-02-10') },
      { name: 'v2.0', status: 'draft', createdAt: new Date('2026-02-15') },
    ],
    skipDuplicates: true,
  });

  // Translations
  await prisma.translations.createMany({
    data: [
      // English v1.2
      {
        key: 'login_title',
        value: 'Welcome Back',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'login_subtitle',
        value: 'Sign in to your account',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'dashboard_welcome',
        value: 'Welcome to your dashboard',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'dashboard_empty_state',
        value: 'No data available',
        language: 'EN',
        version: 'v1.2',
      },
      { key: 'button_save', value: 'Save', language: 'EN', version: 'v1.2' },
      {
        key: 'button_cancel',
        value: 'Cancel',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'button_delete',
        value: 'Delete',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'error_required_field',
        value: 'This field is required',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'error_network',
        value: 'Network error. Please try again',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'navigation_home',
        value: 'Home',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'navigation_settings',
        value: 'Settings',
        language: 'EN',
        version: 'v1.2',
      },
      {
        key: 'settings_profile',
        value: 'Profile Settings',
        language: 'EN',
        version: 'v1.2',
      },

      // Ukrainian v1.2
      {
        key: 'login_title',
        value: 'Ласкаво просимо',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'login_subtitle',
        value: 'Увійдіть у свій обліковий запис',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'dashboard_welcome',
        value: 'Ласкаво просимо на вашу панель',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'dashboard_empty_state',
        value: '',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'button_save',
        value: 'Зберегти',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'button_cancel',
        value: 'Скасувати',
        language: 'UK',
        version: 'v1.2',
      },
      { key: 'button_delete', value: '', language: 'UK', version: 'v1.2' },
      {
        key: 'error_required_field',
        value: "Це поле обов'язкове",
        language: 'UK',
        version: 'v1.2',
      },
      { key: 'error_network', value: '', language: 'UK', version: 'v1.2' },
      {
        key: 'navigation_home',
        value: 'Головна',
        language: 'UK',
        version: 'v1.2',
      },
      {
        key: 'navigation_settings',
        value: 'Налаштування',
        language: 'UK',
        version: 'v1.2',
      },
      { key: 'settings_profile', value: '', language: 'UK', version: 'v1.2' },

      // German v1.2
      {
        key: 'login_title',
        value: 'Willkommen zurück',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'login_subtitle',
        value: 'Melden Sie sich bei Ihrem Konto an',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'dashboard_welcome',
        value: 'Willkommen zu Ihrem Dashboard',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'dashboard_empty_state',
        value: 'Keine Daten verfügbar',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'button_save',
        value: 'Speichern',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'button_cancel',
        value: 'Abbrechen',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'button_delete',
        value: 'Löschen',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'error_required_field',
        value: 'Dieses Feld ist erforderlich',
        language: 'DE',
        version: 'v1.2',
      },
      { key: 'error_network', value: '', language: 'DE', version: 'v1.2' },
      {
        key: 'navigation_home',
        value: 'Startseite',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'navigation_settings',
        value: 'Einstellungen',
        language: 'DE',
        version: 'v1.2',
      },
      {
        key: 'settings_profile',
        value: 'Profileinstellungen',
        language: 'DE',
        version: 'v1.2',
      },

      // English v1.1
      { key: 'login_title', value: 'Welcome', language: 'EN', version: 'v1.1' },
      {
        key: 'login_subtitle',
        value: 'Please sign in',
        language: 'EN',
        version: 'v1.1',
      },
      {
        key: 'dashboard_welcome',
        value: 'Dashboard',
        language: 'EN',
        version: 'v1.1',
      },
      { key: 'button_save', value: 'Save', language: 'EN', version: 'v1.1' },
      {
        key: 'button_cancel',
        value: 'Cancel',
        language: 'EN',
        version: 'v1.1',
      },
    ],
    skipDuplicates: true,
  });

  console.log('🌱 Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
