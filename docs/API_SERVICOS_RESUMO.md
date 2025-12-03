# API de Serviços - Resumo Rápido

## 🎯 Endpoints Implementados

### ✅ 1. Criar Serviço
```http
POST /service-offerings
Content-Type: application/json

{
  "artistId": "68e6db1f4d462a0b6acb574f",
  "title": "Maquiagem para Festas",
  "description": "Descrição opcional",
  "media": [
    { "type": "image", "url": "https://..." }
  ],
  "active": true
}
```
**Retorna**: `201 Created` + objeto criado com `_id`

---

### ✅ 2. Listar Serviços do Artista
```http
GET /service-offerings/artist/:artistId
```
**Retorna**: `200 OK` + array de serviços (todos: ativos e inativos)

---

## ❌ Não Implementados (Ainda)

- `GET /service-offerings/:id` - Buscar por ID
- `PUT/PATCH /service-offerings/:id` - Atualizar
- `DELETE /service-offerings/:id` - Deletar
- `PATCH /service-offerings/:id/toggle-active` - Ativar/Desativar

---

## 📋 Modelo de Dados

```typescript
interface ServiceOffering {
  _id: string;                    // Gerado automaticamente
  artistId: string;               // ObjectId do artista (obrigatório)
  title: string;                  // Título do serviço (obrigatório)
  description?: string;           // Descrição (opcional)
  media?: Array<{                 // Mídias (opcional)
    type: 'image' | 'video';
    url: string;
  }>;
  active: boolean;                // Status (default: true)
}
```

---

## 🚀 Exemplos de Uso

### Axios/Fetch - Criar Serviço
```typescript
const criar = async () => {
  const response = await axios.post('/service-offerings', {
    artistId: "68e6db1f4d462a0b6acb574f",
    title: "Maquiagem Social",
    active: true
  });
  console.log('Criado:', response.data._id);
};
```

### Axios/Fetch - Listar Serviços
```typescript
const listar = async (artistId: string) => {
  const response = await axios.get(`/service-offerings/artist/${artistId}`);
  const servicos = response.data; // Array de serviços

  // Filtrar apenas ativos (se necessário)
  const ativos = servicos.filter(s => s.active);
  return ativos;
};
```

---

## ⚠️ Observações Importantes

1. **Campo `active`**: Sempre enviar explicitamente (`true` ou `false`)
2. **Listagem**: Retorna TODOS os serviços (filtrar no frontend se necessário)
3. **IDs**: Backend aceita strings e converte para ObjectId automaticamente
4. **Validação**: `artistId` deve ser MongoId válido, `title` é obrigatório

---

## 📄 Documentação Completa

Para detalhes completos, exemplos avançados e troubleshooting:
👉 Ver: [API_SERVICOS_FRONTEND.md](./API_SERVICOS_FRONTEND.md)
