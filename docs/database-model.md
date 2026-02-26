# 📚 Documentação — Implementação do Banco de Dados

## 🏗️ 1. Modelagem do Banco de Dados

### 🎯 Regras de Negócio

O sistema de campeonatos foi modelado considerando as seguintes regras:

* Um **Championship** pode possuir várias **Match**
* Uma **Match** pertence a um único **Championship**
* Uma **Match** possui:

  * Um **Team** como mandante (`homeTeam`)
  * Um **Team** como visitante (`awayTeam`)
* Um **Team** pode participar de várias partidas:

  * Como mandante
  * Como visitante
* Uma partida não pode existir sem campeonato
* Uma partida não pode existir sem dois times associados

---

### 🗂️ Tabelas Criadas

#### `championship`

* `id`
* `name`

#### `team`

* `id`
* `name`

#### `match`

* `id`
* `championship_id` (FK)
* `home_team_id` (FK)
* `away_team_id` (FK)

---

### 🔢 Enums Utilizados

Exemplo de enum para status da partida:

```ts
export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
}
```

No banco (PostgreSQL), o enum é criado como um tipo específico.

---

### 🧩 Plataforma utilizada para o Diagrama ER

Foi utilizada a plataforma **dbdiagram.io** para modelagem do Diagrama Entidade-Relacionamento (ER), permitindo:

* Visualização clara dos relacionamentos
* Definição de chaves primárias e estrangeiras
* Representação de enums
* Exportação do diagrama

---

# ⚙️ 2. Configuração do TypeORM

## 📦 Instalação

```bash
pnpm add typeorm pg
pnpm add -D typeorm-ts-node-commonjs
```

---

## 🗄️ Criação do DataSource

Arquivo:

```
apps/api/src/data-source.ts
```

Exemplo:

```ts
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
```

---

# 🔁 3. Configuração de Migrations

## 📌 Comando Base

```bash
pnpm typeorm-ts-node-commonjs migration:generate ./src/migrations/NOME -d ./src/data-source.ts
```

---

## ❌ Erros Encontrados e Soluções

### 1️⃣ Erro: Missing required argument: dataSource

**Causa:** TypeORM 0.3+ exige explicitamente o DataSource.

**Solução:**
Adicionar `-d src/data-source.ts` no comando.

---

### 2️⃣ Erro: Given data source file must contain export of a DataSource instance

**Causa:** Export incorreto ou caminho errado.

**Solução:**
Garantir que o arquivo exporte corretamente:

```ts
export const dataSource = new DataSource({...})
```

E rodar o comando dentro do workspace correto.

---

### 3️⃣ Erro: client password must be a string

**Causa:** Variável de ambiente não carregada.

**Solução:**

* Corrigir nome das variáveis no `.env`
* Forçar carregamento com `dotenv.config`
* Garantir que `password` seja convertido para string

---

### 4️⃣ Erro: Cannot find module 'src/...'

**Causa:** Uso de alias `src/*` no import das entities.

**Solução:**
Substituir imports absolutos por caminhos relativos:

```ts
import { Match } from '../../match/entity/match.entity';
```

O CLI do TypeORM não respeita automaticamente os paths do `tsconfig`.

---

# 🧾 4. Scripts Configurados

## 📁 apps/api/package.json

```json
{
  "scripts": {
    "migration:generate": "typeorm-ts-node-commonjs migration:generate ./src/migrations -d ./src/data-source.ts",
    "migration:run": "typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert -d ./src/data-source.ts"
  }
}
```

---

## 📁 package.json (raiz do monorepo)

```json
{
  "scripts": {
    "migration:generate": "pnpm --filter api run migration:generate",
    "migration:run": "pnpm --filter api run migration:run",
    "migration:revert": "pnpm --filter api run migration:revert"
  }
}
```

---

## 🚀 Comandos Finais Utilizados

Gerar migration:

```bash
pnpm migration:generate -- nomeDaMigration
```

Rodar migrations:

```bash
pnpm migration:run
```

Reverter última migration:

```bash
pnpm migration:revert
```

---

# ✅ Resultado Final

Ao final da configuração, o projeto possui:

* Modelagem ER documentada
* TypeORM configurado corretamente
* DataSource funcional
* Migrations gerando corretamente
* Scripts padronizados na raiz do monorepo
* Ambiente preparado para evolução do schema com versionamento

---

# 📌 Conclusão

A implementação do banco foi estruturada seguindo boas práticas:

* Separação clara de responsabilidades
* Uso de migrations ao invés de `synchronize`
* Correção de problemas comuns do TypeORM 0.3+
* Organização adequada para monorepo com Turbo + pnpm
