# 🚀 Guia de Setup - Quebra Tigela API

Guia rápido para configurar e rodar o projeto em outra máquina.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
  - Download: https://nodejs.org/
  - Verificar: `node -v`

- **pnpm** (gerenciador de pacotes)
  - Instalar: `npm install -g pnpm`
  - Verificar: `pnpm -v`

- **MongoDB** (banco de dados)
  - Download: https://www.mongodb.com/try/download/community
  - Ou usar MongoDB Compass (interface visual)
  - Verificar: `mongod --version`

---

## ⚙️ Configuração do Projeto

### 1. Clone o Repositório
```bash
git clone https://github.com/RodrigoMuller0018/quebra-tigela-api.git
cd quebra-tigela-api
```

### 2. Instale as Dependências
```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/quebra-tigela
PORT=3000
JWT_SECRET=devsecret
```

**Personalize se necessário:**
- `MONGODB_URI`: URL de conexão do MongoDB
- `PORT`: Porta do servidor (padrão: 3000)
- `JWT_SECRET`: Chave secreta para tokens JWT (use uma forte em produção)

### 4. Inicie o MongoDB

**No Windows:**
```bash
# Via serviço (se instalado como serviço)
net start MongoDB

# Ou via MongoDB Compass:
# Abra o MongoDB Compass e conecte em mongodb://localhost:27017
```

**No macOS/Linux:**
```bash
# Via Homebrew
brew services start mongodb-community

# Ou manualmente
mongod --dbpath /caminho/para/dados
```

---

## 🏃 Executar o Projeto

### Modo Desenvolvimento (com hot-reload)
```bash
pnpm run start:dev
```

O servidor iniciará em: **http://localhost:3000**

### Outros Modos

```bash
# Modo produção
pnpm run start:prod

# Modo debug
pnpm run start:debug

# Build do projeto
pnpm run build
```

---

## ✅ Verificar se está Funcionando

### 1. Teste a API

Abra o navegador ou use Postman/Insomnia:

```
GET http://localhost:3000
```

Deve retornar: `Hello World!` ou similar

### 2. Verifique os Endpoints

**Exemplo - Listar serviços de um artista:**
```
GET http://localhost:3000/service-offerings/artist/{artistId}
```

**Exemplo - Criar serviço:**
```
POST http://localhost:3000/service-offerings
Content-Type: application/json

{
  "artistId": "68e6db1f4d462a0b6acb574f",
  "title": "Maquiagem Social",
  "description": "Maquiagem para eventos",
  "active": true
}
```

---

## 📚 Documentação Adicional

- **API de Serviços**: Ver `docs/API_SERVICOS_RESUMO.md`
- **Coleção Postman**: Ver `postman/quebra-tigela-api.postman_collection.json`

---

## 🐛 Problemas Comuns

### MongoDB não conecta
- Verifique se o MongoDB está rodando: `mongosh` ou MongoDB Compass
- Confirme a URL em `.env`: `MONGODB_URI=mongodb://127.0.0.1:27017/quebra-tigela`

### Porta 3000 já em uso
- Altere `PORT=3001` no `.env`
- Ou finalize o processo usando a porta:
  - Windows: `netstat -ano | findstr :3000` e `taskkill /PID {pid} /F`
  - Linux/macOS: `lsof -ti:3000 | xargs kill -9`

### Erro ao instalar dependências
- Limpe o cache: `pnpm store prune`
- Delete `node_modules` e `pnpm-lock.yaml`
- Reinstale: `pnpm install`

### Canvas/Sharp não compila
```bash
# Windows - Instale Visual Studio Build Tools
npm install --global windows-build-tools

# Linux - Instale dependências
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# macOS - Instale Xcode Command Line Tools
xcode-select --install
```

---

## 🧪 Testes

```bash
# Testes unitários
pnpm run test

# Testes E2E
pnpm run test:e2e

# Cobertura de testes
pnpm run test:cov
```

---

## 📦 Estrutura do Projeto

```
quebra-tigela-api/
├── src/
│   ├── artists/         # Módulo de artistas
│   ├── auth/            # Autenticação e autorização
│   ├── services/        # Módulo de serviços (service-offerings)
│   ├── schedule/        # Agendamentos
│   ├── requests/        # Solicitações
│   └── main.ts          # Arquivo principal
├── docs/                # Documentação
├── postman/             # Coleção Postman
├── .env                 # Variáveis de ambiente (criar)
├── package.json         # Dependências
└── README.md            # Documentação
```

---

## 🔧 Scripts Úteis

```bash
# Formatar código
pnpm run format

# Linter
pnpm run lint

# Build
pnpm run build

# Desenvolvimento
pnpm run start:dev
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique a seção **Problemas Comuns** acima
2. Consulte os logs do servidor
3. Abra uma issue no GitHub

---

## ✅ Checklist de Setup

- [ ] Node.js instalado
- [ ] pnpm instalado
- [ ] MongoDB instalado e rodando
- [ ] Repositório clonado
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Arquivo `.env` criado
- [ ] Servidor rodando (`pnpm run start:dev`)
- [ ] API respondendo em http://localhost:3000

**Pronto! 🎉 O projeto está rodando!**
