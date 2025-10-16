# 🔧 INSTRUÇÕES URGENTES - Configuração do Supabase

## ❌ PROBLEMA IDENTIFICADO

Suas alterações não estão sendo salvas porque **faltam 2 tabelas no banco de dados Supabase**:

1. ❌ `field_sizes` - para salvar tamanhos de textareas
2. ❌ `priority_dropdowns` - para salvar prioridades (Urgente/Não Urgente)

**Erro no console:**
```
"Could not find the table 'public.field_sizes' in the schema cache"
"Could not find the table 'public.priority_dropdowns' in the schema cache"
```

---

## ✅ SOLUÇÃO (PASSO A PASSO)

### **1. Abrir Supabase Dashboard**
- Acesse: https://supabase.com/dashboard
- Faça login na sua conta
- Selecione o projeto: **vxhohdxqdrfkqtmhflhy**

### **2. Abrir SQL Editor**
- No menu lateral esquerdo, clique em **"SQL Editor"**
- Clique em **"New query"** (Nova consulta)

### **3. Copiar e Colar o Script SQL**
- Abra o arquivo: `supabase-tables.sql` (nesta pasta)
- **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)
- **Cole no SQL Editor** do Supabase (Ctrl+V)

### **4. Executar o Script**
- Clique no botão **"Run"** (Executar) ou pressione **Ctrl+Enter**
- Aguarde a mensagem: **"Success. No rows returned"**

### **5. Verificar se as Tabelas Foram Criadas**
- No menu lateral, clique em **"Table Editor"**
- Você deve ver as novas tabelas:
  - ✅ `checkboxes` (já existia)
  - ✅ `text_fields` (já existia)
  - ✅ `field_sizes` **(NOVA - acabou de criar)**
  - ✅ `priority_dropdowns` **(NOVA - acabou de criar)**

### **6. Testar a Aplicação**
- Volte para a aplicação: https://leitdiegousp.github.io/CheckList-Reformas-AcademiaAthenea/
- Recarregue com **Ctrl+F5** (hard refresh)
- Faça uma alteração (ex: mude uma prioridade para "Urgente")
- Clique em **"Sincronizar"**
- Abra em **outro navegador/aba anônima**
- **Verifique se a alteração aparece** ✅

---

## 📊 O Que Cada Tabela Armazena

### **checkboxes** (já existe)
- Salva estado dos checkboxes (marcado/desmarcado)
- Exemplo: `{ id: "fossa1", checked: true }`

### **text_fields** (já existe)
- Salva textos dos campos (nomes de responsáveis, observações)
- Exemplo: `{ id: "eletrica1-responsavel", value: "André" }`

### **field_sizes** (NOVA - você vai criar agora)
- Salva tamanhos redimensionados de textareas
- Exemplo: `{ id: "eletrica1-observacoes", width: "300px", height: "150px" }`

### **priority_dropdowns** (NOVA - você vai criar agora)
- Salva valores dos dropdowns de prioridade
- Exemplo: `{ id: "limpeza1-prioridade", value: "urgente" }`

---

## 🎯 Por Que Estava Falhando?

**Antes:**
```
Aplicação tenta salvar → Supabase retorna 404 → "Tabela não encontrada" → Nada é salvo
```

**Depois (após criar as tabelas):**
```
Aplicação tenta salvar → Supabase salva com sucesso ✅ → Sincroniza entre dispositivos
```

---

## ⚠️ IMPORTANTE

- **NÃO** pule nenhum passo
- Execute **TODO** o conteúdo do arquivo `supabase-tables.sql`
- Verifique se apareceu **"Success"** no SQL Editor
- Teste em **outro navegador** para confirmar sincronização

---

## 🆘 Se Tiver Problemas

1. **Erro ao executar SQL?**
   - Verifique se você está logado no projeto correto
   - Tente executar linha por linha

2. **Tabelas não aparecem?**
   - Recarregue a página do Supabase Dashboard
   - Verifique em "Table Editor" → Schema: "public"

3. **Ainda não sincroniza?**
   - Abra Console do navegador (F12)
   - Recarregue a página (Ctrl+F5)
   - Me envie os erros que aparecerem em vermelho

---

## ✅ Como Saber que Funcionou?

Você saberá que está funcionando quando:

1. ✅ No console aparecer: **"✅ X campos salvos"** (sem erros 404)
2. ✅ Abrir em outro navegador e ver as mesmas alterações
3. ✅ Clicar em "Sincronizar" e aparecer: **"Online - Sincronizado com Supabase"**
4. ✅ **Nenhum erro vermelho** no console do navegador

---

**Qualquer dúvida, me chame! 🚀**
