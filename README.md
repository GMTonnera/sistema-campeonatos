# Sistema de Campeonatos

Monorepo fullstack para evolução de um sistema de gerenciamento de campeonatos, com frontend em React/Vite, backend em NestJS e espaço para pacotes compartilhados.

## 📦 Estrutura do projeto

```text
.
├── apps/
│   ├── api/            # API NestJS
│   └── web/            # Frontend React + Vite
├── packages/
│   └── types/          # Tipos compartilháveis entre apps
├── docs/
│   └── monorepo-config.md
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 🧱 Stack

- **Monorepo:** pnpm workspaces
- **Orquestração:** Turborepo
- **Frontend:** React 19 + Vite + TypeScript
- **Backend:** NestJS 11 + TypeScript
- **Pacotes compartilhados:** `@campeonato/types`

## ✅ Pré-requisitos

- Node.js 20+
- pnpm `10.29.3` (ou compatível)

> Dica: habilite o Corepack para fixar o gerenciador de pacotes do projeto.

```bash
corepack enable
corepack prepare pnpm@10.29.3 --activate
```

## 🚀 Começando

### 1) Instalar dependências

```bash
pnpm install
```

### 2) Rodar tudo em modo desenvolvimento (Turbo)

```bash
pnpm dev
```

Esse comando executa os scripts `dev` de todos os workspaces relevantes.

## 🔧 Comandos úteis

### Raiz do monorepo

```bash
pnpm dev      # roda tarefas de desenvolvimento via turbo
pnpm build    # build de todos os apps/pacotes com pipeline do turbo
```

### Frontend (`apps/web`)

```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web preview
pnpm --filter web lint
```

### Backend (`apps/api`)

```bash
pnpm --filter api dev
pnpm --filter api build
pnpm --filter api test
pnpm --filter api test:e2e
pnpm --filter api lint
```

## 🌐 Aplicações

- **Web:** normalmente disponível em `http://localhost:5173`
- **API:** normalmente disponível em `http://localhost:3000`

Endpoint inicial da API:

- `GET /` → retorna `Hello World!`

## 📁 Pacotes compartilhados

O pacote `packages/types` está preparado para concentrar tipos e contratos compartilhados entre frontend e backend:

- nome do pacote: `@campeonato/types`
- ponto de entrada atual: `index.ts`

## 📚 Documentação adicional

- `docs/monorepo-config.md`: histórico e decisões da configuração inicial do monorepo.

## 🗺️ Próximos passos sugeridos

- Definir domínio inicial (ex.: campeonatos, temporadas, times, partidas).
- Compartilhar DTOs/contratos no pacote `@campeonato/types`.
- Configurar variáveis de ambiente por app (`.env` por workspace).
- Adicionar CI para lint, test e build.
