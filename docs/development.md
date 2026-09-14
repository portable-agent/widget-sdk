# Разработка

## TDD

1. Добавьте тест с одним ожидаемым поведением.
2. Убедитесь, что он падает по нужной причине.
3. Добавьте минимальный код.
4. Запустите все проверки.

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm pack:check
pwsh ./scripts/check-docs.ps1
```

## Обновление контракта

1. Выпустите новую SemVer-версию в `portable-agent/contracts`.
2. Скопируйте schema из release bundle в `contracts/`.
3. Обновите версию в `contracts/SOURCE.md`, `catalog-info.yaml`, `package.json` и документации.
4. Выполните `pnpm generate`.
5. Проверьте diff generated type и добавьте тест для нового поведения.

SDK не читает соседнюю локальную репу и не загружает `main` во время сборки.
