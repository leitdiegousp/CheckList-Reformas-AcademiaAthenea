const fs = require('fs');

// Ler o arquivo
const content = fs.readFileSync('index.html', 'utf8');

// Extrair seções completas (com comentário, header, ações e materiais)
function extractSection(content, commentStart, nextCommentOrEnd) {
    const startIndex = content.indexOf(commentStart);
    if (startIndex === -1) return null;
    
    const endIndex = nextCommentOrEnd ? content.indexOf(nextCommentOrEnd, startIndex + 1) : content.length;
    if (endIndex === -1) return null;
    
    return content.substring(startIndex, endIndex);
}

// Encontrar ponto de inserção após "Pia parte de Fora"
const piaComment = '<!-- Pia parte de Fora -->';
const piaEndMarker = '<!-- Colchões';
const insertPoint = content.indexOf(piaEndMarker);

console.log('Ponto de inserção encontrado:', insertPoint);

// Extrair seções
const colchoesSection = extractSection(content, '<!-- Colchões', '<!-- Forro');
const forroSection = extractSection(content, '<!-- Forro', '<!-- Ver sujeira');
const casaPereSection = extractSection(content, '<!-- Ver sujeira', '<!-- Reformar Banheiros');
const banheirosSection = extractSection(content, '<!-- Reformar Banheiros', '<!-- Lago');
const lagoSection = extractSection(content, '<!-- Lago', '<!-- Limpezas');
const limpezasSection = extractSection(content, '<!-- Limpezas', '<!-- Varais');
const varaisSection = extractSection(content, '<!-- Varais', '<!-- Área externa');
const areaExternaSection = extractSection(content, '<!-- Área externa', '<!-- Cozinha');
const cozinhaSection = extractSection(content, '<!-- Cozinha', '<!-- Fazer parapeito');
const parapeitoSection = extractSection(content, '<!-- Fazer parapeito', '<!-- Santuário');
const santuarioSection = extractSection(content, '<!-- Santuário', '<!-- Mutirão');

console.log('Seções extraídas:');
console.log('- Colchões:', colchoesSection ? 'OK' : 'ERRO');
console.log('- Forro:', forroSection ? 'OK' : 'ERRO');
console.log('- Casa Peregrino:', casaPereSection ? 'OK' : 'ERRO');
console.log('- Banheiros:', banheirosSection ? 'OK' : 'ERRO');
console.log('- Lago:', lagoSection ? 'OK' : 'ERRO');
console.log('- Limpezas:', limpezasSection ? 'OK' : 'ERRO');
console.log('- Varais:', varaisSection ? 'OK' : 'ERRO');
console.log('- Área Externa:', areaExternaSection ? 'OK' : 'ERRO');
console.log('- Cozinha:', cozinhaSection ? 'OK' : 'ERRO');
console.log('- Parapeito:', parapeitoSection ? 'OK' : 'ERRO');
console.log('- Santuário:', santuarioSection ? 'OK' : 'ERRO');

// Nova ordem após Pia:
// 1. Reformar banheiros
// 2. Forro
// 3. Colchões
// 4. Limpezas (inclui Varais dentro)
// 5. Lago
// 6. Santuário
// 7. Casa Peregrino
// 8. Área Externa
// 9. Cozinha
// 10. Parapeito

const newOrder = [
    banheirosSection,
    forroSection,
    colchoesSection,
    limpezasSection,
    varaisSection,
    lagoSection,
    santuarioSection,
    casaPereSection,
    areaExternaSection,
    cozinhaSection,
    parapeitoSection
].filter(Boolean).join('\n                ');

// Remover as seções antigas
let newContent = content;

// Remover cada seção do conteúdo original
[colchoesSection, forroSection, casaPereSection, banheirosSection, lagoSection, 
 limpezasSection, varaisSection, areaExternaSection, cozinhaSection, parapeitoSection, santuarioSection]
    .filter(Boolean)
    .forEach(section => {
        newContent = newContent.replace(section, '');
    });

// Inserir na nova ordem no ponto correto
newContent = newContent.replace(piaEndMarker, '\n                ' + newOrder + '\n                ' + piaEndMarker.replace('<!-- Colchões', '<!-- Mutirão'));

// Salvar
fs.writeFileSync('index_reordered.html', newContent, 'utf8');
console.log('\n✅ Arquivo salvo como index_reordered.html');
console.log('Revise o arquivo e, se estiver correto, renomeie para index.html');
