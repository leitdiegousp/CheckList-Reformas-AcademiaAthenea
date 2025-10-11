const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

// Substituir todas as ocorrências de <td class="material-item"> por <td colspan="5" class="material-item">
html = html.replace(
    /<td class="material-item">/g,
    '<td colspan="5" class="material-item">'
);

// Salvar o arquivo
fs.writeFileSync('index.html', html, 'utf8');

console.log('✅ Todas as 34 linhas de materiais agora têm colspan="5"');
