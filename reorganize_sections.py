#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para reorganizar seções do checklist mantendo materiais juntos
Ordem desejada após "Pia parte de Fora":
1. Reformar banheiros (F e M)
2. Forro faltando quarto casal (Cozinha)
3. Colchões - Peregrinos Casal e Solteiro (M e F)
4. Limpezas e Pinturas
5. Lago
6. Santuário de Cura
7. Restante (Casa Peregrino, Área externa, Cozinha, Parapeito, Mutirão)
"""

import re
import sys

def read_file(filename):
    """Lê o arquivo HTML"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"❌ Erro ao ler arquivo: {e}")
        sys.exit(1)

def write_file(filename, content):
    """Escreve o arquivo HTML"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Arquivo salvo: {filename}")
    except Exception as e:
        print(f"❌ Erro ao escrever arquivo: {e}")
        sys.exit(1)

def extract_section_by_comment(content, comment_text):
    """
    Extrai uma seção completa começando pelo comentário até o próximo comentário de seção
    Retorna: (section_content, start_pos, end_pos)
    """
    # Procurar pelo comentário
    comment_pattern = rf'<!-- {re.escape(comment_text)} -->'
    match = re.search(comment_pattern, content)
    
    if not match:
        return None, -1, -1
    
    start = match.start()
    
    # Encontrar o próximo comentário de seção (próximo <!--)
    next_comment = re.search(r'\n\s+<!-- ', content[match.end():])
    
    if next_comment:
        end = match.end() + next_comment.start()
    else:
        # Se não encontrar próximo comentário, vai até o final de tbody
        tbody_end = content.find('</tbody>', match.end())
        end = tbody_end if tbody_end != -1 else len(content)
    
    section = content[start:end]
    return section, start, end

def main():
    print("🔧 Reorganizando seções do checklist...")
    print("=" * 60)
    
    # Ler arquivo original
    content = read_file('index.html')
    original_length = len(content)
    print(f"📄 Arquivo original: {original_length} caracteres")
    
    # Definir seções a serem movidas (na ordem que aparecem atualmente)
    sections_to_extract = [
        'Colchões - Peregrinos Casal e Solteiro (M e F)',
        'Forro faltando quarto casal (Cozinha)',
        'Ver sujeira caindo teto',  # Casa Peregrino
        'Reformar Banheiros',  # ou 'Reformar banheiros (F e M)'
        'Lago',
        'Limpezas e Pinturas',
        'Varais áereos Lavanderia devido ao Curso (itens pertencem à seção Limpezas)',
        'Área externa',
        'Cozinha',
        'Fazer parapeito no andar dos banheiros',
        'Santuário de Cura',
    ]
    
    # Extrair todas as seções
    print("\n📦 Extraindo seções...")
    extracted = {}
    for sec_name in sections_to_extract:
        section, start, end = extract_section_by_comment(content, sec_name)
        if section:
            extracted[sec_name] = {'content': section, 'start': start, 'end': end}
            print(f"  ✓ {sec_name}: {len(section)} chars (pos {start}-{end})")
        else:
            print(f"  ✗ {sec_name}: NÃO ENCONTRADA")
    
    # Verificar se encontrou as seções principais
    required = ['Reformar Banheiros', 'Forro faltando quarto casal (Cozinha)', 
                'Colchões - Peregrinos Casal e Solteiro (M e F)', 'Limpezas e Pinturas', 'Lago', 'Santuário de Cura']
    
    missing = [s for s in required if s not in extracted]
    if missing:
        print(f"\n❌ Seções obrigatórias não encontradas: {missing}")
        print("Tentando com nomes alternativos...")
        
        # Tentar variações de nomes
        if 'Reformar Banheiros' not in extracted:
            for alt in ['Reformar banheiros (F e M)', 'Ajeitar Banheiros (F e M)']:
                section, start, end = extract_section_by_comment(content, alt)
                if section:
                    extracted['Reformar Banheiros'] = {'content': section, 'start': start, 'end': end}
                    print(f"  ✓ Reformar Banheiros (como '{alt}'): {len(section)} chars")
                    break
    
    # Encontrar ponto de inserção (após seção Pia parte de Fora)
    print("\n🎯 Localizando ponto de inserção...")
    pia_section, pia_start, pia_end = extract_section_by_comment(content, 'Pia parte de Fora')
    
    if not pia_section:
        # Tentar nome alternativo
        pia_section, pia_start, pia_end = extract_section_by_comment(content, 'Pia Fora')
    
    if not pia_section:
        print("❌ Seção 'Pia parte de Fora' não encontrada!")
        sys.exit(1)
    
    print(f"  ✓ Pia parte de Fora: pos {pia_start}-{pia_end}")
    insert_point = pia_end
    
    # Nova ordem desejada (após Pia)
    new_order = [
        'Reformar Banheiros',
        'Forro faltando quarto casal (Cozinha)',
        'Colchões - Peregrinos Casal e Solteiro (M e F)',
        'Limpezas e Pinturas',
        'Varais áereos Lavanderia devido ao Curso (itens pertencem à seção Limpezas)',
        'Lago',
        'Santuário de Cura',
        'Ver sujeira caindo teto',
        'Área externa',
        'Cozinha',
        'Fazer parapeito no andar dos banheiros',
    ]
    
    # Remover seções do conteúdo original (da última para a primeira para não afetar índices)
    print("\n🗑️  Removendo seções antigas...")
    sorted_sections = sorted(extracted.items(), key=lambda x: x[1]['start'], reverse=True)
    
    new_content = content
    for sec_name, sec_data in sorted_sections:
        before = new_content[:sec_data['start']]
        after = new_content[sec_data['end']:]
        new_content = before + after
        print(f"  ✓ Removida: {sec_name}")
    
    # Montar bloco com seções na nova ordem
    print("\n🔄 Montando nova ordem...")
    sections_block = ""
    for sec_name in new_order:
        if sec_name in extracted:
            sections_block += "\n" + extracted[sec_name]['content']
            print(f"  ✓ Adicionada: {sec_name}")
    
    # Encontrar ponto de inserção no novo conteúdo
    pia_section_new, pia_start_new, pia_end_new = extract_section_by_comment(new_content, 'Pia parte de Fora')
    if not pia_section_new:
        pia_section_new, pia_start_new, pia_end_new = extract_section_by_comment(new_content, 'Pia Fora')
    
    # Inserir seções reorganizadas
    final_content = new_content[:pia_end_new] + sections_block + "\n" + new_content[pia_end_new:]
    
    print(f"\n📊 Estatísticas:")
    print(f"  Original: {len(content)} caracteres")
    print(f"  Final: {len(final_content)} caracteres")
    print(f"  Diferença: {len(final_content) - len(content)} caracteres")
    
    # Salvar em arquivo temporário
    output_file = 'index_reorganized.html'
    write_file(output_file, final_content)
    
    print("\n" + "=" * 60)
    print("✅ REORGANIZAÇÃO CONCLUÍDA!")
    print(f"📁 Arquivo gerado: {output_file}")
    print("\n⚠️  PRÓXIMOS PASSOS:")
    print("1. Abra o arquivo no navegador e teste")
    print("2. Verifique se todas as seções estão corretas")
    print("3. Se estiver OK, substitua o original:")
    print(f"   mv {output_file} index.html")
    print("4. Faça commit:")
    print("   git add index.html")
    print("   git commit -m '♻️ Reorganização de seções'")
    print("   git push origin master")

if __name__ == '__main__':
    main()
