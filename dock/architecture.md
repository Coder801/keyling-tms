# Translation Management Platform — Technical Documentation (v1)

## 1. Overview

Translation Management Platform — это SaaS-сервис для хранения, управления и публикации переводов с поддержкой версий.

Основные возможности:

- Управление переводами (flat keys)
- Поддержка нескольких языков
- Версионирование переводов (Draft / Published)
- Публичная выдача переводов через API
- Кеширование и высокая скорость отдачи
- Админка с ролевой моделью

---

## 2. Архитектура

### Backend

- NestJS
- PostgreSQL (через Prisma)
- Redis
- REST API

### Frontend (Admin UI)

- React + TypeScript
- CSS Modules
- React Query

### Инфраструктура

- Redis для кеша переводов
- Возможность генерации JSON для CDN
- Docker-ready

---

## 3. Доменные сущности

### 3.1 User

- User
- id: string
- email: string
- passwordHash: string
- role: ADMIN | EDITOR | VIEWER
- createdAt: Date

Назначение: Авторизация и контроль доступа.

---

### 3.2 Language

- Language
- id: string
- code: string (en, de, uk)
- name: string
- isActive: boolean

Назначение: Управление доступными языками.

---

### 3.3 Version

- Version
- id: string
- name: string
- status: DRAFT | PUBLISHED
- createdAt: Date
- publishedAt?: Date

Назначение: Управление релизами переводов и откат версий.

---

### 3.4 Translation

- Translation
- id: string
- key: string (flat, single-level)
- value: string
- languageId: string
- versionId: string
- createdAt: Date
- updatedAt: Date

Ограничения:

- Ключи только flat (без вложенности)
- Уникальность: (key, languageId, versionId)

---

### 3.5 AuditLog (optional)

- AuditLog
- id
- userId
- entityType
- entityId
- action
- before
- after
- createdAt

Назначение: логирование изменений для аудита.

---

## 4. Авторизация

- JWT-based authentication
- Role-based access control
- Middleware / Guards в NestJS

Роли:

| Role   | Permissions           |
| ------ | --------------------- |
| ADMIN  | Full access + publish |
| EDITOR | CRUD translations     |
| VIEWER | Read only             |

---

## 5. API Specification

### Auth

- POST /auth/login
- POST /auth/register

### Versions

- GET /versions
- POST /versions
- PATCH /versions/:id
- POST /versions/:id/publish

### Translations

- GET /translations?version=ID&language=en
- POST /translations
- PATCH /translations/:id
- DELETE /translations/:id

### Public API

- GET /public/:version/:locale.json
  Ответ:

```json
{
  "login_title": "Login",
  "dashboard_empty": "No data available"
}
```
