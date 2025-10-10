#!/usr/bin/env python3
"""
Script para adicionar colunas de Responsável e Observações
nas linhas de ação do checklist
"""

import re

# Ler o arquivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Padrão para encontrar linhas de ação (que têm checkbox com id)
# Procura por linhas que terminam com </td> seguido de checkbox-cell
pattern = r'(<input type="checkbox" id="([^"]+)">[^<]*<label for="\2">[^<]+</label>\s*</td>\s*<td class="checkbox-cell"><input type="checkbox"[^>]*></td>\s*<td class="checkbox-cell"><input type="checkbox"[^>]*></td>)'

def add_columns(match):
    original = match.group(0)
    task_id = match.group(2)
    
    # Adicionar as duas novas colunas
    new_columns = f'''
                    <td class="text-cell"><input type="text" id="{task_id}-responsavel" placeholder="Nome do responsável"></td>
                    <td class="text-cell"><textarea id="{task_id}-observacoes" placeholder="Observações" rows="1"></textarea></td>'''
    
    return original + new_columns

# Substituir
content = re.sub(pattern, add_columns, content)

# Atualizar as linhas de cabeçalho de seção (section-header)
# Adicionar colunas vazias nas linhas de seção
section_pattern = r'(<td class="section-header">[^<]+</td>\s*<td></td>\s*<td></td>)'

def add_section_columns(match):
    return match.group(0) + '\n                    <td></td>\n                    <td></td>'

content = re.sub(section_pattern, add_section_columns, content)

# Salvar
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Colunas adicionadas com sucesso!")
print("📝 Agora execute o script de atualização do JavaScript")
