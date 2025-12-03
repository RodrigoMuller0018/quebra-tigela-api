# API de Serviços - Documentação para Frontend

## 📋 Base URL
```
http://localhost:3000/service-offerings
```

---

## 🎯 Endpoints Disponíveis

### 1. Criar Serviço

**Endpoint**: `POST /service-offerings`

**Descrição**: Cria um novo serviço para um artista

**Body** (JSON):
```json
{
  "artistId": "68e6db1f4d462a0b6acb574f",
  "title": "Maquiagem para Festas",
  "description": "Maquiagem profissional para festas e eventos especiais",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image1.jpg"
    },
    {
      "type": "video",
      "url": "https://example.com/video1.mp4"
    }
  ],
  "active": true
}
```

**Campos**:
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `artistId` | string (MongoId) | ✅ Sim | ID do artista (formato ObjectId) |
| `title` | string | ✅ Sim | Título do serviço |
| `description` | string | ❌ Não | Descrição detalhada do serviço |
| `media` | array | ❌ Não | Lista de mídias (imagens/vídeos) |
| `media[].type` | string | ✅ Sim (se media existir) | Tipo: `"image"` ou `"video"` |
| `media[].url` | string | ✅ Sim (se media existir) | URL da mídia |
| `active` | boolean | ❌ Não | Status ativo/inativo (default: `true`) |

**Resposta de Sucesso** (Status: `201 Created`):
```json
{
  "_id": "691d33d986e2b41284ba5477",
  "artistId": "68e6db1f4d462a0b6acb574f",
  "title": "Maquiagem para Festas",
  "description": "Maquiagem profissional para festas e eventos especiais",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image1.jpg"
    }
  ],
  "active": true
}
```

**Exemplo de Uso (Axios)**:
```typescript
const criarServico = async (dados: CriarServicoDto) => {
  const response = await axios.post('/service-offerings', dados);
  return response.data;
};
```

---

### 2. Listar Serviços por Artista

**Endpoint**: `GET /service-offerings/artist/:artistId`

**Descrição**: Retorna todos os serviços de um artista (ativos e inativos)

**Parâmetros de URL**:
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `artistId` | string | ID do artista (formato ObjectId) |

**Exemplo de URL**:
```
GET /service-offerings/artist/68e6db1f4d462a0b6acb574f
```

**Resposta de Sucesso** (Status: `200 OK`):
```json
[
  {
    "_id": "691d2bba9857e10c4d803c54",
    "artistId": "68e6db1f4d462a0b6acb574f",
    "title": "Maquiagem Social",
    "description": "Maquiagem para eventos sociais",
    "media": [],
    "active": true
  },
  {
    "_id": "691d33d986e2b41284ba5477",
    "artistId": "68e6db1f4d462a0b6acb574f",
    "title": "Maquiagem para Festas",
    "description": "Maquiagem profissional para festas e eventos especiais",
    "media": [
      {
        "type": "image",
        "url": "https://example.com/image1.jpg"
      }
    ],
    "active": true
  }
]
```

**Resposta Vazia** (quando não há serviços):
```json
[]
```

**Exemplo de Uso (Axios)**:
```typescript
const listarServicos = async (artistId: string) => {
  const response = await axios.get(`/service-offerings/artist/${artistId}`);
  return response.data;
};
```

---

## 🔧 Funcionalidades Pendentes

As seguintes funcionalidades ainda **NÃO** estão implementadas no backend:

### ❌ Atualizar Serviço
```
PUT /service-offerings/:id
PATCH /service-offerings/:id
```
**Status**: Não implementado

### ❌ Deletar Serviço
```
DELETE /service-offerings/:id
```
**Status**: Não implementado

### ❌ Buscar Serviço por ID
```
GET /service-offerings/:id
```
**Status**: Não implementado

### ❌ Ativar/Desativar Serviço
```
PATCH /service-offerings/:id/toggle-active
```
**Status**: Não implementado

---

## 📦 Estrutura de Dados (MongoDB)

**Collection**: `services`

**Documento**:
```json
{
  "_id": ObjectId("691d33d986e2b41284ba5477"),
  "artistId": ObjectId("68e6db1f4d462a0b6acb574f"),
  "title": "Maquiagem para Festas",
  "description": "Maquiagem profissional para festas e eventos especiais",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/image1.jpg"
    }
  ],
  "active": true
}
```

**Índices**:
- `{ artistId: 1, active: 1 }` - Composto para busca otimizada
- `{ artistId: 1 }` - Individual no campo artistId
- `{ active: 1 }` - Individual no campo active

---

## ⚠️ Notas Importantes

### 1. Conversão de ObjectId
O backend converte automaticamente strings de IDs válidos para ObjectId:
- ✅ Frontend envia: `"68e6db1f4d462a0b6acb574f"` (string)
- ✅ Backend salva: `ObjectId("68e6db1f4d462a0b6acb574f")` (ObjectId)
- ✅ Backend busca: `ObjectId("68e6db1f4d462a0b6acb574f")` (ObjectId)

### 2. Campo `active`
- **Default**: `true` (definido no schema)
- **Recomendação**: Sempre enviar explicitamente `active: true` ou `active: false` no POST
- **Listagem**: Retorna **TODOS** os serviços (ativos e inativos)
- **Filtro no Frontend**: Se quiser mostrar apenas ativos, filtrar no frontend:
  ```typescript
  const servicosAtivos = servicos.filter(s => s.active === true);
  ```

### 3. Validações
O backend valida automaticamente:
- ✅ `artistId` deve ser um MongoId válido
- ✅ `title` é obrigatório e deve ser string
- ✅ `media[].type` só aceita `"image"` ou `"video"`
- ✅ `active` deve ser boolean (se fornecido)

---

## 🚀 Exemplos Práticos

### Criar Serviço Mínimo
```typescript
const servicoMinimo = {
  artistId: "68e6db1f4d462a0b6acb574f",
  title: "Meu Serviço"
};

const response = await axios.post('/service-offerings', servicoMinimo);
// Retorna: { _id: "...", artistId: "...", title: "Meu Serviço", media: [], active: true }
```

### Criar Serviço Completo
```typescript
const servicoCompleto = {
  artistId: "68e6db1f4d462a0b6acb574f",
  title: "Maquiagem Artística",
  description: "Maquiagem criativa para ensaios fotográficos e editoriais",
  media: [
    { type: "image", url: "https://cdn.example.com/foto1.jpg" },
    { type: "image", url: "https://cdn.example.com/foto2.jpg" },
    { type: "video", url: "https://cdn.example.com/video.mp4" }
  ],
  active: true
};

const response = await axios.post('/service-offerings', servicoCompleto);
```

### Listar e Filtrar Serviços Ativos
```typescript
const artistId = "68e6db1f4d462a0b6acb574f";
const response = await axios.get(`/service-offerings/artist/${artistId}`);
const todosServicos = response.data;

// Filtrar apenas ativos
const servicosAtivos = todosServicos.filter(s => s.active === true);

// Filtrar apenas inativos
const servicosInativos = todosServicos.filter(s => s.active === false);
```

---

## 🐛 Troubleshooting

### Problema: Serviço criado mas não aparece na listagem

**Causa**: Campo `artistId` pode estar sendo salvo como string no banco

**Solução**: Verificar no MongoDB se o `artistId` está como ObjectId:
```javascript
// No MongoDB Compass ou Shell
db.services.findOne({ _id: ObjectId("...") })
// artistId deve ser: ObjectId("...") e não "..."
```

Se estiver como string, o backend foi corrigido e novos serviços devem funcionar. Serviços antigos precisam ser recriados ou ter o campo convertido manualmente.

---

## 📞 Suporte

Se encontrar algum problema ou precisar de novos endpoints, reporte no repositório ou contate o time de backend.

**Arquivos Backend Relacionados**:
- Controller: [src/services/services.controller.ts](../src/services/services.controller.ts)
- Service: [src/services/services.service.ts](../src/services/services.service.ts)
- DTO: [src/services/dto/create-service.dto.ts](../src/services/dto/create-service.dto.ts)
- Schema: [src/services/schemas/service.schema.ts](../src/services/schemas/service.schema.ts)
