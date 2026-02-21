# 📦 Configuração do Monorepo — Sistema de Campeonatos

Este documento descreve o passo a passo da configuração do monorepo para o projeto **Sistema de Campeonatos**, incluindo:

* Estruturação inicial
* Configuração do Turbo
* Integração com pnpm
* Problemas encontrados
* Como evitar esses problemas
* Explicações sobre decisões arquiteturais importantes

---

# 🏗️ 1. Objetivo da Estrutura

Criar um **monorepo fullstack** contendo:

* `apps/web` → Frontend (React + Vite)
* `apps/api` → Backend (NestJS)
* `packages/*` → Código compartilhado
* Orquestração via **Turbo**
* Gerenciamento de dependências via **pnpm**

---

# 🚀 2. Inicialização do Monorepo em Repositório Existente

O repositório já existia e continha apenas um `README.md`.

### Passo 1 — Inicializar o projeto na raiz

```bash
pnpm init
```

Adicionar Turbo:

```bash
pnpm add -D turbo
```

---

# 📦 3. Configuração de Workspaces

Criado o arquivo `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

No `package.json` da raiz:

```json
{
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "devDependencies": {
    "turbo": "^latest"
  }
}
```

---

# 🔒 Por que `"private": true` é importante?

* Impede publicação acidental no npm.
* É obrigatório para habilitar workspaces.
* Indica que a raiz é apenas um agregador de projetos.

Sem `"private": true`, workspaces podem falhar ou gerar comportamento inesperado.

---

# 🗂️ 4. Estrutura Criada

```plaintext
.
├── apps/
│   ├── web/
│   └── api/
├── packages/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

# 🌐 5. Criação do Frontend

```bash
cd apps
pnpm create vite web
```

Selecionado:

* React
* TypeScript

---

# 🏗️ 6. Criação do Backend

```bash
npx @nestjs/cli new api
```

⚠️ Problema: O Nest cria um `.git` automaticamente dentro de `apps/api`.

---

# ❌ Problema 1 — Erro ao rodar `pnpm dev`

Erro:

```
Git error on apps/api: error reading file for hashing
```

## 🔍 Causa

O Nest criou um repositório Git interno:

```
apps/api/.git
```

Isso faz com que o Git da raiz interprete `apps/api` como submódulo incompleto.

---

# ✅ Solução

Remover o Git interno:

```bash
rm -rf apps/api/.git
```

Reindexar:

```bash
git rm -r --cached .
git add .
git commit -m "fix: remove nested git repo"
```

---

# 🛑 Problema 2 — Erro ao rodar `git add .`

Erro:

```
'apps/api/' does not have a commit checked out
```

## 🔍 Causa

O Git estava interpretando `apps/api` como submódulo inválido por causa do `.git` interno.

## ✅ Solução

Remover `.git` interno e reindexar o repositório (mesmo processo acima).

---

# 🛡️ Como evitar esse erro no futuro

Sempre criar projeto Nest com:

```bash
npx @nestjs/cli new api --skip-git
```

Isso impede a criação do `.git` interno.

---

# ⚙️ 7. Configuração do turbo.json

Arquivo criado:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

---

# 🧠 Explicação da Configuração do Turbo

## `$schema`

Apenas fornece autocomplete e validação no editor.

---

## `build`

```json
"build": {
  "dependsOn": ["^build"],
  "outputs": ["dist/**"]
}
```

### `dependsOn: ["^build"]`

Garante que:

* Antes de executar `build` em um pacote
* O Turbo execute `build` nos pacotes dos quais ele depende

O `^` significa dependências internas do workspace.

---

### `outputs: ["dist/**"]`

Informa ao Turbo:

> Esses arquivos são resultado do build.

Permite:

* Cache inteligente
* Reaproveitamento de build
* Execução incremental

---

## `dev`

```json
"dev": {
  "cache": false
}
```

Desabilita cache para `dev` porque:

* Dev normalmente usa hot reload
* São processos contínuos
* Cache não faz sentido nesse contexto

---

# 🧠 Como o Turbo Funciona

Quando executamos:

```
turbo run build
```

O Turbo:

1. Calcula hash baseado em:

   * Código
   * Dependências
   * Estado do Git
2. Se o hash já foi processado:

   * Reaproveita build
3. Caso contrário:

   * Executa build
   * Armazena cache

Isso torna o monorepo extremamente eficiente.

---

# 🧹 8. Arquivo .gitignore

Foi criado um `.gitignore` adequado para:

* node_modules
* builds (`dist`, `build`)
* cache do Turbo
* arquivos do Playwright
* arquivos de ambiente
* arquivos do sistema operacional

Isso evita versionar arquivos desnecessários.

---

# 📚 Conclusão

O monorepo foi configurado com:

* pnpm workspaces
* Turbo para orquestração
* React no frontend
* NestJS no backend
* Estrutura escalável para packages compartilhados

## Problemas encontrados:

1. Git aninhado criado pelo Nest
2. Erro de hashing do Turbo
3. Erro ao adicionar arquivos no Git

## Como evitar:

* Sempre usar `--skip-git` ao criar apps internos
* Verificar se existe `.git` dentro de subpastas
* Fazer commit inicial antes de rodar Turbo

---

# 🎯 Estado Final

O projeto agora possui:

* Estrutura monorepo funcional
* Turbo configurado corretamente
* Workspaces habilitados
* Git funcionando adequadamente
* Ambiente pronto para evolução

---

Próximos passos recomendados:

* Configurar `tsconfig` base compartilhado
* Criar `packages/types`
* Configurar Docker
* Integrar NestJS com PostgreSQL
* Definir modelagem inicial do domínio

