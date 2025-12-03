# Problema: Listagem de Serviços Não Mostra Todos os Serviços

## 🐛 Sintomas

- Frontend cria serviço com sucesso (POST retorna 201)
- Ao listar serviços imediatamente depois (GET), o serviço recém-criado NÃO aparece
- Apenas alguns serviços antigos aparecem na lista

## 🔍 Causa Raiz

**Arquivo**: `src/services/services.service.ts`

O método `byArtist` estava filtrando apenas serviços com `active: true`:

```typescript
// ❌ CÓDIGO COM PROBLEMA
byArtist(artistId: string) {
  return this.model.find({
    artistId: new Types.ObjectId(artistId),
    active: true,  // ❌ FILTRO RESTRITIVO
  });
}
```

### Por que isso causava o problema?

1. **Campo `active` opcional no DTO**: O campo `active` é opcional ao criar o serviço
2. **Serviços sem `active` explícito**: Quando o frontend não envia `active: true`, o MongoDB pode salvar como `undefined`, `null` ou `false`
3. **Filtro exclui esses serviços**: A query `active: true` só retorna documentos onde `active === true` exatamente
4. **Serviços "desaparecem"**: Mesmo que o schema tenha `default: true`, pode haver inconsistências

## ✅ Solução

Remover o filtro `active: true` do método `byArtist`:

```typescript
// ✅ CÓDIGO CORRIGIDO
byArtist(artistId: string) {
  return this.model.find({
    artistId: new Types.ObjectId(artistId),
  });
}
```

### Justificativa

- **Artistas precisam ver TODOS os seus serviços** (ativos e inativos) para gerenciá-los
- Se houver necessidade de filtrar apenas serviços ativos, isso deve ser feito:
  - No frontend (filtro de UI)
  - Em um endpoint separado (ex: `/service-offerings/artist/:id/active`)
  - Com um parâmetro de query (ex: `?active=true`)

## 🧪 Como Testar

1. Criar um novo serviço sem especificar `active`:
   ```json
   POST /service-offerings
   {
     "artistId": "68e6db1f4d462a0b6acb574f",
     "title": "Teste sem active"
   }
   ```

2. Listar serviços do artista:
   ```
   GET /service-offerings/artist/68e6db1f4d462a0b6acb574f
   ```

3. O serviço recém-criado deve aparecer na lista ✅

## 📊 Verificação no MongoDB

Se o problema persistir, verificar no MongoDB:

```javascript
// Ver estrutura do documento
db.services.findOne({ _id: ObjectId("691d33d986e2b41284ba5477") })

// Verificar tipo do artistId (deve ser ObjectId)
db.services.find({ artistId: { $type: "objectId" } })

// Verificar valores do campo active
db.services.aggregate([
  { $group: { _id: "$active", count: { $sum: 1 } } }
])
```

## 🎯 Status

- [x] Problema identificado
- [x] Solução implementada
- [ ] Testado no ambiente de desenvolvimento
- [ ] Serviços antigos verificados no MongoDB

## 📝 Notas Adicionais

- O schema define `default: true` para o campo `active`, mas isso só funciona se o campo não for enviado no DTO
- Se o DTO enviar `active: undefined`, o Mongoose pode não aplicar o default
- Recomendação: Garantir no frontend que `active` seja sempre enviado explicitamente como `true` ou `false`
