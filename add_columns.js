const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

// 1. Atualizar o CSS primeiro
html = html.replace(
  /\.checkbox-cell \{\s*text-align: center;\s*width: 15%;\s*\}/,
  `.checkbox-cell {
            text-align: center;
            width: 10%;
        }
        
        .text-cell {
            width: 15%;
        }`
);

html = html.replace(
  /input\[type="checkbox"\] \{[^}]+\}/,
  `input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        
        input[type="text"], textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            resize: vertical;
            min-height: 30px;
        }
        
        input[type="text"]:focus, textarea:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }`
);

// 2. Atualizar cabeçalho da tabela
html = html.replace(
  /<thead>\s*<tr>\s*<th>Ação<\/th>\s*<th class="checkbox-cell">Urgente<\/th>\s*<th class="checkbox-cell">Não Urgente<\/th>\s*<\/tr>\s*<\/thead>/,
  `<thead>
                <tr>
                    <th>Ação</th>
                    <th class="checkbox-cell">Urgente</th>
                    <th class="checkbox-cell">Não Urgente</th>
                    <th class="text-cell">Responsável</th>
                    <th class="text-cell">Observações</th>
                </tr>
            </thead>`
);

// 3. Adicionar colunas vazias nas linhas de cabeçalho de seção
html = html.replace(
  /(<td class="section-header">[^<]+<\/td>\s*<td><\/td>\s*<td><\/td>)/g,
  `$1
                    <td></td>
                    <td></td>`
);

// 4. Adicionar campos de texto nas linhas de ação
const actionPattern = /(<td class="action-cell">\s*<input type="checkbox" id="([^"]+)">\s*<label for="\2">.*?<\/label>\s*<\/td>\s*<td class="checkbox-cell"><input type="checkbox"[^>]*><\/td>\s*<td class="checkbox-cell"><input type="checkbox"[^>]*><\/td>)/gs;

html = html.replace(actionPattern, (match, p1, taskId) => {
  return `${p1}
                    <td class="text-cell"><input type="text" id="${taskId}-responsavel" placeholder="Nome do responsável"></td>
                    <td class="text-cell"><textarea id="${taskId}-observacoes" placeholder="Observações" rows="1"></textarea></td>`;
});

// Salvar
fs.writeFileSync('index.html', html, 'utf8');

console.log('✅ Colunas adicionadas com sucesso!');
