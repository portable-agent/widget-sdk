# Portable Agent Widget SDK

Общее TypeScript-ядро карточек для Web, Telegram, VK и будущих каналов Portable Agent.

SDK не рисует конкретный UI. Он проверяет неизвестный JSON по опубликованному контракту и создаёт
безопасную команду решения с теми же `actionId` и `payloadHash`. Адаптер канала сам выбирает кнопки,
цвета и разметку.

## Что уже работает

- JSON Schema закреплена на release `portable-agent/contracts v2.3.0`;
- TypeScript type создаётся из схемы, а не пишется вручную;
- `parseCard` отклоняет неизвестные поля и неверный hash;
- `makeDecision` создаёт `CONFIRM` или `CANCEL` только для доступной кнопки;
- тесты, lint, typecheck, package build и документация проверяются в CI.

## Пример

```typescript
import { makeDecision, parseCard } from '@portable-agent/widget-sdk';

const card = parseCard(message.reply.card);
const command = makeDecision(card, 'CONFIRM');

// adapter отправляет command в доверенный backend
```

SDK не хранит token и не вызывает Action Service напрямую. Это делает backend-адаптер канала.

## Проверка

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm typecheck
pnpm pack:check
```

Подробности: [документация](docs/index.md), [граница SDK](SERVICE.md), [правила для агентов](AGENTS.md).

## Лицензия

Apache License 2.0.
