-- Tabela para armazenar fotos das tarefas
-- Execute este script no Supabase SQL Editor

-- Criar tabela task_photos
CREATE TABLE IF NOT EXISTS task_photos (
    task_id TEXT PRIMARY KEY,
    photos TEXT NOT NULL DEFAULT '[]',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar índice para melhorar performance
CREATE INDEX IF NOT EXISTS idx_task_photos_updated_at ON task_photos(updated_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE task_photos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura para todos" 
    ON task_photos FOR SELECT 
    USING (true);

-- Criar política para permitir inserção/atualização pública
CREATE POLICY "Permitir inserção/atualização para todos" 
    ON task_photos FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Permitir atualização para todos" 
    ON task_photos FOR UPDATE 
    USING (true);

-- Criar política para permitir exclusão pública
CREATE POLICY "Permitir exclusão para todos" 
    ON task_photos FOR DELETE 
    USING (true);

-- Verificar se a tabela foi criada
SELECT * FROM task_photos LIMIT 1;
