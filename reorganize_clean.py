#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para reorganizar seções removendo duplicações
"""

import re

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    print("🧹 Limpando duplicações e reorganizando...")
    
    # Ler arquivo original
    content = read_file('index.html')
    
    # 1. Remover segunda ocorrência de "Forro faltando" (linhas 841-861)
    # Padrão: captura desde o comentário até antes do próximo comentário
    forro_pattern = r'(<!-- Forro faltando -->.*?)</tr>\s+\n\s+\n\s+(<!-- Forro faltando -->.*?</tr>\s+\n\s+\n\s+)'
    
    # Encontrar e remover duplicata
    match = re.search(forro_pattern, content, re.DOTALL)
    if match:
        # Manter apenas a primeira ocorrência
        content = content.replace(match.group(0), match.group(1) + '</tr>\n\n                \n                ', 1)
        print("  ✓ Removida duplicação de Forro")
    
    # 2. Extrair seção "Forro faltando" completa
    forro_match = re.search(r'(<!-- Forro faltando -->.*?)(?=\n\s+<!-- )', content, re.DOTALL)
    if forro_match:
        forro_section = forro_match.group(1)
        # Remover do local atual
        content = content.replace(forro_section, '', 1)
        print("  ✓ Extraída seção Forro")
    else:
        print("  ✗ Forro não encontrado")
        forro_section = ""
    
    # 3. Encontrar ponto de inserção (após "Reformar banheiros")
    # Encontrar o final da seção Reformar banheiros (após seus materiais)
    banheiro_end = re.search(r'(<!-- Reformar Banheiros -->.*?</tr>)\s+\n\s+\n\s+(?=<!-- )', content, re.DOTALL)
    
    if banheiro_end:
        insert_pos = banheiro_end.end()
        # Inserir Forro logo após Reformar banheiros
        content = content[:insert_pos] + '\n                ' + forro_section + '\n\n                ' + content[insert_pos:]
        print("  ✓ Forro inserido após Reformar banheiros")
    
    # Salvar
    write_file('index_final.html', content)
    print("\n✅ Arquivo salvo: index_final.html")
    print("📊 Tamanho: {} caracteres".format(len(content)))

if __name__ == '__main__':
    main()
