# 🚀 Como Configurar Supabase para Sincronização do Checklist

O checklist está pronto para sincronizar em tempo real usando Supabase!

## 📋 Passo a Passo

### 1️⃣ Acessar sua conta Supabase

1. Acesse: https://supabase.com/dashboard
2. Faça login com sua conta
3. Clique em **"New Project"** (ou selecione um projeto existente)

### 2️⃣ Criar/Selecionar Projeto

Se for criar novo projeto:
1. Nome: `checklist-reformas` (ou qualquer nome)
2. Database Password: Crie uma senha forte (anote!)
3. Region: Escolha a mais próxima (ex: South America - São Paulo)
4. Clique em **"Create new project"**
5. Aguarde 2-3 minutos para o projeto ser criado

### 3️⃣ Criar a Tabela no Banco de Dados

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**
3. Cole o seguinte código SQL:

```sql
-- Criar tabela para armazenar estado dos checkboxes
CREATE TABLE checkboxes (
  id TEXT PRIMARY KEY,
  checked BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (segurança)
ALTER TABLE checkboxes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura pública" 
ON checkboxes FOR SELECT 
USING (true);

-- Criar política para permitir escrita pública
CREATE POLICY "Permitir escrita pública" 
ON checkboxes FOR INSERT 
WITH CHECK (true);

-- Criar política para permitir atualização pública
CREATE POLICY "Permitir atualização pública" 
ON checkboxes FOR UPDATE 
USING (true);

-- Criar índice para melhor performance
CREATE INDEX idx_checkboxes_updated_at ON checkboxes(updated_at DESC);

-- Habilitar Realtime (sincronização em tempo real)
ALTER PUBLICATION supabase_realtime ADD TABLE checkboxes;
```

4. Clique em **"Run"** ou pressione `Ctrl+Enter`
5. Deve aparecer "Success. No rows returned"

### 4️⃣ Obter as Credenciais

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Você verá duas informações importantes:

   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (uma string longa)

4. **COPIE** essas duas informações

### 5️⃣ Configurar o index.html

1. Abra o arquivo `index.html`
2. Localize estas linhas (por volta da linha 700):

```javascript
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';  // ⬅️ SUBSTITUA AQUI
const SUPABASE_KEY = 'SUA_CHAVE_PUBLICA_ANON_AQUI';      // ⬅️ SUBSTITUA AQUI
```

3. **Substitua** pelos valores que você copiou:

```javascript
const SUPABASE_URL = 'https://xxxxxxxxxxxxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

4. Salve o arquivo

### 6️⃣ Hospedar o Arquivo (Obrigatório)

Para que funcione em vários navegadores, você PRECISA hospedar online:

#### Opção A: GitHub Pages (Recomendado - Gratuito)

```bash
# 1. Adicionar alterações
git add .

# 2. Fazer commit
git commit -m "Adiciona sincronização com Supabase"

# 3. Enviar para GitHub
git push origin master
```

Depois no GitHub:
1. Vá em: https://github.com/leitdiegousp/CheckList-Reformas-AcademiaAthenea
2. Clique em **"Settings"**
3. No menu lateral, clique em **"Pages"**
4. Em **"Branch"**, selecione `master` (ou `main`)
5. Clique em **"Save"**
6. Aguarde alguns minutos
7. Seu site estará em: `https://leitdiegousp.github.io/CheckList-Reformas-AcademiaAthenea/`

#### Opção B: Netlify (Mais Rápido)

1. Acesse: https://www.netlify.com/
2. Arraste a pasta do projeto para o site
3. Pronto! Você receberá um link tipo: `https://seu-site.netlify.app`

#### Opção C: Vercel

1. Acesse: https://vercel.com/
2. Conecte com seu GitHub
3. Selecione o repositório
4. Deploy automático

### 7️⃣ Configurar CORS no Supabase (Se necessário)

Se tiver problemas de CORS:

1. Vá em **Project Settings** > **API**
2. Role até **"Allowed Origins"**
3. Adicione seu domínio GitHub Pages ou Netlify
4. Exemplo: `https://leitdiegousp.github.io`

## ✅ Testando

1. Abra o site hospedado em um navegador
2. Marque alguns checkboxes
3. Abra o mesmo link em outro navegador ou computador
4. Os checkboxes devem estar marcados!
5. Ao marcar em um navegador, deve atualizar automaticamente em todos

## 🎯 Funcionalidades

✅ **Sincronização em tempo real**: Mudanças aparecem instantaneamente em todos os navegadores
✅ **Persistência**: Dados salvos permanentemente no banco de dados
✅ **Multiplataforma**: Funciona em qualquer dispositivo
✅ **Histórico**: Cada mudança registra quando foi atualizada
✅ **Fallback**: Se Supabase não estiver configurado, usa localStorage

## 🔍 Verificando os Dados

Para ver os dados salvos no Supabase:

1. Vá em **"Table Editor"** no menu lateral
2. Selecione a tabela **"checkboxes"**
3. Você verá todos os checkboxes e seus estados

## 🔒 Segurança (Opcional)

As políticas atuais permitem que qualquer um leia e escreva. Para produção, considere:

1. Adicionar autenticação (Email/Password)
2. Restringir escrita apenas para usuários autenticados
3. Criar roles (admin, editor, viewer)

### Exemplo de Segurança com Autenticação:

```sql
-- Remover políticas públicas
DROP POLICY "Permitir leitura pública" ON checkboxes;
DROP POLICY "Permitir escrita pública" ON checkboxes;
DROP POLICY "Permitir atualização pública" ON checkboxes;

-- Criar políticas apenas para usuários autenticados
CREATE POLICY "Permitir tudo para autenticados" 
ON checkboxes 
USING (auth.role() = 'authenticated');
```

## 📱 App Mobile (Futuro)

Com Supabase, você pode facilmente criar um app mobile usando:
- React Native
- Flutter
- Ionic

Tudo usando a mesma base de dados!

## 🆘 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se a URL e a KEY estão corretas
- Verifique se o arquivo está hospedado (não pode ser file://)

### Checkboxes não sincronizam
- Abra o Console do navegador (F12)
- Procure por erros
- Verifique se a tabela foi criada corretamente no Supabase

### Indicador mostra "Offline"
- Significa que o Supabase não está configurado
- Verifique se substituiu as credenciais corretamente

## 📞 Suporte

- Documentação Supabase: https://supabase.com/docs
- Tutorial JS: https://supabase.com/docs/reference/javascript/introduction
- Discord Supabase: https://discord.supabase.com/

---

**Status Atual**: Aguardando configuração das credenciais Supabase
