const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

// Substituir todas as estruturas de section-header que têm 5 colunas separadas
// por uma única coluna com colspan="5"
html = html.replace(
    /<td class="section-header">([^<]+)<\/td>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>/g,
    '<td colspan="5" class="section-header">$1</td>'
);

// Salvar o arquivo
fs.writeFileSync('index.html', html, 'utf8');

console.log('✅ Todas as linhas de cabeçalho de seção agora têm colspan="5"');
console.log('✅ Títulos ocupam toda a largura da tabela!');
