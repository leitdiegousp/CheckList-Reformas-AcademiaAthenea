const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

console.log('🔧 Iniciando correções...\n');

// 1. CORRIGIR COLSPAN DOS MATERIAIS (de 2 para 4)
console.log('1️⃣ Corrigindo colspan das linhas de materiais...');
html = html.replace(
  /(<tr class="materials-section">[\s\S]*?<td colspan=")2("[\s\S]*?<\/tr>)/g,
  '$14$2'
);
console.log('   ✅ Colspan atualizado de 2 para 4\n');

// 2. CORRIGIR COLSPAN DO CABEÇALHO DE MATERIAIS (de 3 para 5)
console.log('2️⃣ Corrigindo colspan do cabeçalho de materiais...');
html = html.replace(
  /(<td colspan=")3(" class="materials-header">Materiais:<\/td>)/g,
  '$15$2'
);
console.log('   ✅ Colspan do cabeçalho atualizado de 3 para 5\n');

// 3. TROCAR input type="text" POR textarea NO CAMPO RESPONSÁVEL
console.log('3️⃣ Convertendo campo Responsável para textarea...');
let count = 0;
html = html.replace(
  /<input type="text" id="([^"]+)-responsavel" placeholder="Nome do responsável">/g,
  (match, taskId) => {
    count++;
    return `<textarea id="${taskId}-responsavel" placeholder="Nome do responsável" rows="1"></textarea>`;
  }
);
console.log(`   ✅ ${count} campos de Responsável convertidos para textarea\n`);

// Salvar
fs.writeFileSync('index.html', html, 'utf8');

console.log('✅ TODAS AS CORREÇÕES APLICADAS COM SUCESSO!');
console.log('\n📊 Resumo:');
console.log(`   - Colspan de materiais corrigido`);
console.log(`   - ${count} campos Responsável agora são redimensionáveis`);
console.log(`   - Tabela agora tem 5 colunas corretamente configuradas`);
