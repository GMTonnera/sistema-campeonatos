# 🐳 Configuração do Banco de Dados com Docker

## 📌 Objetivo

Documentar o processo de configuração do banco de dados PostgreSQL utilizando Docker no projeto **Campeonatos**, estruturado como monorepo com Turbo.

---

# 🏗 Estrutura do Projeto

O projeto utiliza um **monorepo**, portanto o arquivo `docker-compose.yml` foi colocado na **raiz do repositório**, permitindo que a infraestrutura seja centralizada e possa futuramente orquestrar múltiplos serviços (backend, frontend, banco, etc.).

Estrutura relevante:

```
campeonatos/
│
├── apps/
│   ├── backend/
│   ├── frontend/
│
├── docker-compose.yml
├── .env
├── turbo.json
└── package.json
```

---

# 📦 Configuração do PostgreSQL

Foi utilizada a imagem oficial do PostgreSQL versão 15.

## 🔐 Variáveis de Ambiente

As variáveis foram isoladas em um arquivo `.env` na raiz do projeto:

```env
POSTGRES_USER=campeonatos_user
POSTGRES_PASSWORD=campeonatos_password
POSTGRES_DB=campeonatos_database
POSTGRES_PORT=5432
```

### Decisão Arquitetural

* O banco foi nomeado como `campeonatos_database` (uso de `_` ao invés de `-` para evitar necessidade de aspas em queries SQL).
* O container foi nomeado como `campeonatos_postgresql` para manter padronização.

---

# 🐳 Arquivo `docker-compose.yml`

Versão final utilizada:

```yaml
services:
  postgres:
    image: postgres:15
    container_name: campeonatos_postgresql
    restart: always
    env_file:
      - .env
    ports:
      - "${POSTGRES_PORT}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

# 🔎 Explicação das Principais Configurações

## `image: postgres:15`

Define a versão da imagem oficial do PostgreSQL.

## `container_name: campeonatos_postgresql`

Define explicitamente o nome do container para facilitar logs e debugging.

## `env_file`

Carrega automaticamente todas as variáveis do arquivo `.env`.

## `ports`

Mapeia a porta do host para a porta interna do container:

```
host:container
```

Neste caso:

```
5432 → 5432
```

## `volumes`

Garante persistência dos dados do banco, mesmo que o container seja removido.

---

# ⚠️ Correção Realizada

Inicialmente o arquivo continha a linha:

```yaml
version: '3.8'
```

Entretanto, foi necessário remover essa linha para que o container subisse corretamente.

## Motivo

A versão atual do Docker Compose (v2+) utiliza a **Compose Specification moderna**, onde o campo `version` é opcional e considerado obsoleto.

Ao remover essa linha, o Docker passou a interpretar automaticamente a especificação adequada, permitindo a inicialização correta do container.

---

# ▶️ Execução

Para subir o banco:

```bash
docker compose up -d
```

Para verificar containers ativos:

```bash
docker ps
```

Para visualizar logs:

```bash
docker logs campeonatos_postgresql
```

---

# 💾 Persistência de Dados

O volume nomeado `postgres_data` garante que:

* Dados não sejam perdidos ao reiniciar o container
* O banco mantenha estado entre execuções
* O ambiente seja confiável para desenvolvimento

---

# 📌 Estado Atual da Infraestrutura

✔ Banco PostgreSQL rodando em container
✔ Variáveis isoladas em `.env`
✔ Volume configurado para persistência
✔ Arquitetura compatível com monorepo
✔ Configuração alinhada com Docker Compose v2

---

**Documento criado para registrar a configuração inicial da infraestrutura do banco de dados do projeto Campeonatos.**

