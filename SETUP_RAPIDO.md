# ⚡ Setup Rápido - Quebra Tigela API

Comandos essenciais para rodar o projeto. **Após `git clone`:**

---

## 🎯 Passo a Passo Rápido

### 1. Pré-requisitos
```bash
# Verifique se tem instalado:
node -v      # ✅ Node.js 18+
pnpm -v      # ✅ pnpm (instalar: npm i -g pnpm)
mongod --version  # ✅ MongoDB
```

### 2. Instalar Dependências
```bash
pnpm install
```

### 3. Criar arquivo `.env`
```env
MONGODB_URI=mongodb://127.0.0.1:27017/quebra-tigela
PORT=3000
JWT_SECRET=devsecret
```

### 4. Iniciar MongoDB
```bash
# Windows
net start MongoDB

# macOS/Linux
brew services start mongodb-community
# ou
mongod
```

### 5. Rodar o Projeto
```bash
pnpm run start:dev
```

### 6. Testar
```
http://localhost:3000
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
pnpm run start:dev

# Build
pnpm run build

# Produção
pnpm run start:prod

# Testes
pnpm run test
```

---

## ⚡ Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| MongoDB não conecta | Inicie o MongoDB: `net start MongoDB` ou `mongod` |
| Porta 3000 ocupada | Altere `PORT` no `.env` para `3001` |
| Erro ao instalar | Delete `node_modules` e rode `pnpm install` novamente |

---

**Pronto! ✅** Veja `GUIA_SETUP.md` para detalhes completos.
