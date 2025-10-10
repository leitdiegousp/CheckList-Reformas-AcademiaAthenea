const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

console.log('🔧 Removendo colunas vazias das linhas de materiais...\n');

// Remover TODAS as colunas vazias (td colspan) das linhas de materiais
// Procura por linhas que têm material-item E td colspan
const beforeCount = (html.match(/<td colspan="4"><\/td>/g) || []).length;

html = html.replace(
  /(<td class="material-item">[\s\S]*?<\/td>)\s*<td colspan="\d+"><\/td>/g,
  '$1'
);

const afterCount = (html.match(/<td colspan="4"><\/td>/g) || []).length;

console.log(`✅ Removidas ${beforeCount - afterCount} colunas vazias das linhas de materiais`);
console.log(`\n📋 Agora as linhas de materiais têm apenas 1 coluna (o material)`);

// Salvar
fs.writeFileSync('index.html', html, 'utf8');

console.log('\n✅ CORREÇÃO APLICADA COM SUCESSO!');
