-- ============================================
-- SCRIPT SQL PARA CRIAR TABELAS FALTANTES
-- Execute este script no Supabase SQL Editor
-- ============================================

-- 1. Tabela para armazenar tamanhos de textareas
CREATE TABLE IF NOT EXISTS public.field_sizes (
    id TEXT PRIMARY KEY,
    width TEXT NOT NULL,
    height TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela para armazenar valores dos dropdowns de prioridade
CREATE TABLE IF NOT EXISTS public.priority_dropdowns (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_field_sizes_id ON public.field_sizes(id);
CREATE INDEX IF NOT EXISTS idx_priority_dropdowns_id ON public.priority_dropdowns(id);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.field_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.priority_dropdowns ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas de acesso (permitir tudo por enquanto)
-- ATENÇÃO: Em produção, você deve restringir o acesso conforme necessário

-- Política para field_sizes
CREATE POLICY "Permitir acesso total a field_sizes"
ON public.field_sizes
FOR ALL
USING (true)
WITH CHECK (true);

-- Política para priority_dropdowns
CREATE POLICY "Permitir acesso total a priority_dropdowns"
ON public.priority_dropdowns
FOR ALL
USING (true)
WITH CHECK (true);

-- 6. Adicionar triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_field_sizes_updated_at
BEFORE UPDATE ON public.field_sizes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_priority_dropdowns_updated_at
BEFORE UPDATE ON public.priority_dropdowns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SCRIPT CONCLUÍDO
-- ============================================
-- Após executar este script:
-- 1. Verifique se as tabelas foram criadas em "Table Editor"
-- 2. Recarregue a aplicação com Ctrl+F5
-- 3. Faça alterações e clique em "Sincronizar"
-- 4. Abra em outro navegador para verificar a sincronização
-- ============================================
