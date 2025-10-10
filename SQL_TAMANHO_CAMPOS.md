# 📏 SQL para Salvar Tamanho dos Campos de Texto

## 🎯 Nova Funcionalidade: Salvar Tamanho dos Campos

Agora quando você redimensionar um campo de texto (arrastar o cantinho), o tamanho será salvo e sincronizado!

## 📋 Execute este SQL no Supabase:

1. Vá em **SQL Editor** no Supabase
2. Clique em **New Query**
3. Cole o código abaixo:

```sql
-- Criar tabela para armazenar tamanhos dos campos de texto
CREATE TABLE IF NOT EXISTS field_sizes (
  id TEXT PRIMARY KEY,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE field_sizes ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública
CREATE POLICY "Permitir leitura pública sizes" 
ON field_sizes FOR SELECT 
USING (true);

-- Permitir escrita pública
CREATE POLICY "Permitir escrita pública sizes" 
ON field_sizes FOR INSERT 
WITH CHECK (true);

-- Permitir atualização pública
CREATE POLICY "Permitir atualização pública sizes" 
ON field_sizes FOR UPDATE 
USING (true);

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_field_sizes_updated_at ON field_sizes(updated_at DESC);

-- Habilitar sincronização em tempo real
ALTER PUBLICATION supabase_realtime ADD TABLE field_sizes;
```

4. Clique em **Run**

## ✅ O que isso faz:

- Quando você **redimensionar** um campo (arrastar o cantinho)
- O tamanho é **salvo automaticamente** após 500ms
- Ao recarregar a página, o campo volta com o **mesmo tamanho**
- Se outra pessoa abrir, verá o campo com o **tamanho que você definiu**
- Sincronização em **tempo real** entre navegadores

## 🧪 Testando:

1. Abra o site
2. Redimensione um campo de texto (arraste o cantinho)
3. Recarregue a página (F5)
4. O campo deve **manter o tamanho** que você definiu! ✅

## 📊 Verificar no Supabase:

1. Vá em **Table Editor**
2. Você verá 3 tabelas agora:
   - checkboxes (estados dos checkboxes)
   - text_fields (conteúdo dos textos)
   - field_sizes (tamanhos dos campos) ← **NOVA!**

---

**Agora os campos lembram do tamanho que você definiu!** 📏✨
