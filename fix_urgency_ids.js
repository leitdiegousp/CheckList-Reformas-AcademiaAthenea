const fs = require('fs');

// Read the HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Pattern to match action rows with urgency checkboxes
// Captures: action checkbox ID, first urgency checkbox, second urgency checkbox
const actionRowPattern = /<td class="action-cell">\s*<input type="checkbox" id="([^"]+)">[^<]*<label for="\1">.*?<\/label>\s*<\/td>\s*<td class="checkbox-cell"><input type="checkbox"([^>]*)><\/td>\s*<td class="checkbox-cell"><input type="checkbox"([^>]*)><\/td>/gs;

// Replace each match with IDs added to urgency checkboxes
html = html.replace(actionRowPattern, (match, actionId, urgentAttrs, naoUrgenteAttrs) => {
    // Clean up attributes (remove closing >)
    urgentAttrs = urgentAttrs.trim();
    naoUrgenteAttrs = naoUrgenteAttrs.trim();
    
    // Add IDs to the urgency checkboxes
    return match.replace(
        /<td class="checkbox-cell"><input type="checkbox"([^>]*)><\/td>\s*<td class="checkbox-cell"><input type="checkbox"([^>]*)><\/td>/,
        `<td class="checkbox-cell"><input type="checkbox" id="${actionId}-urgente"$1></td>
                    <td class="checkbox-cell"><input type="checkbox" id="${actionId}-nao-urgente"$2></td>`
    );
});

// Save the file
fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ IDs adicionados aos checkboxes de urgência!');
console.log('Padrão: {actionId}-urgente e {actionId}-nao-urgente');
