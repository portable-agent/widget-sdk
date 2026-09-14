$ErrorActionPreference = "Stop"

$requiredFiles = @(
    "README.md",
    "AGENTS.md",
    "SERVICE.md",
    "catalog-info.yaml",
    "mkdocs.yml",
    "contracts/SOURCE.md",
    "docs/index.md",
    "docs/architecture.md",
    "docs/development.md",
    "docs/runbook.md",
    "docs/decisions/0001-renderer-neutral-core.md"
)

$missingFiles = $requiredFiles | Where-Object { -not (Test-Path -LiteralPath $_ -PathType Leaf) }
if ($missingFiles.Count -gt 0) {
    throw "Нет обязательных файлов: $($missingFiles -join ', ')"
}

$catalogText = Get-Content -LiteralPath "catalog-info.yaml" -Raw
if ($catalogText -notmatch "backstage\.io/techdocs-ref:\s*dir:\.") {
    throw "В catalog-info.yaml нет backstage.io/techdocs-ref: dir:."
}
if ($catalogText -notmatch "action-confirmation@2\.3\.0") {
    throw "В catalog-info.yaml должна быть закреплена версия контракта 2.3.0."
}

$sourceText = Get-Content -LiteralPath "contracts/SOURCE.md" -Raw
if ($sourceText -notmatch "v2\.3\.0") {
    throw "contracts/SOURCE.md не содержит release v2.3.0."
}

$serviceText = Get-Content -LiteralPath "SERVICE.md" -Raw
if ($serviceText -notmatch "не вызывает Action Service напрямую") {
    throw "SERVICE.md не фиксирует сетевую границу SDK."
}

Write-Host "Документация widget-sdk соответствует стандарту."
