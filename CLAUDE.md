# Translation Management Platform — Coding Guidelines

This document defines coding standards and architectural rules for this project.
Claude must follow these rules when generating or modifying code.

---

## 1. General Rules

- Use **TypeScript** everywhere.
- Use `type` instead of `interface`.
- All types must be fully typed (no `any` unless absolutely necessary).
- Prefer functional programming patterns.
- Use arrow functions.
- Avoid default exports. Use named exports only.
- Keep files small and focused.

---

## 2. Type Definitions

- All types must be stored in separate files.
- Types should live in a `types/` directory.
- Component-specific types should be placed in a `types.ts` file inside the component folder.
- Shared/global types should live in `shared/types/`.

---

## 3. React Architecture

### Component Structure

Each component must have its own folder.

Structure:

- ComponentName/
  - index.ts
  - ComponentName.tsx
  - types.ts
  - styles.module.scss

Rules:

- `index.ts` is the entry point and re-exports the component.
- Only named exports.
- One component per folder.
- Keep components under 200 lines.
- Extract business logic into hooks.

---

## 4. Styling

- Use **CSS Modules** only.
- File naming: `styles.module.scss`
- No global CSS (except reset).
- No inline styles.
- Class naming: camelCase.

---

## 5. Imports Order

Imports must follow this order:

1. External libraries
2. Shared modules
3. Local modules
4. Styles

No wildcard imports.
Prefer direct imports (e.g., `lodash/pick` instead of full lodash).

---

## 6. State Management

- Prefer React hooks.
- Use React Query for server state.
- No unnecessary global state.
- Avoid prop drilling — use composition.

---

## 7. API Layer

- Use a dedicated `services/` layer.
- No API calls directly inside components.
- API responses must be strongly typed.
- Always return structured JSON responses.

---

## 8. Backend Rules (if applicable)

- Use service layer pattern.
- No business logic inside controllers.
- All endpoints must be version-aware.
- Translations must use flat keys (no nesting).
- Support version-based architecture.
- Use Redis caching strategy for translation retrieval.

---

## 9. Naming Conventions

- Components: PascalCase
- Files: PascalCase for components
- Hooks: useCamelCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

---

## 10. Translation-Specific Rules

- Translation keys must be flat (single-level).
- No dot notation.
- Each translation must belong to:
  - language
  - version
  - key
  - value
- Support version publishing flow (Draft / Published).

---

Claude must strictly follow this architecture when generating new code.
