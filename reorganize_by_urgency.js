const fs = require('fs');

// Ler o arquivo
let html = fs.readFileSync('index.html', 'utf8');

// Função para extrair e reorganizar uma seção
function reorganizeSection(sectionMatch) {
    const lines = sectionMatch.split('\n');
    const header = [];
    const urgentTasks = [];
    const notUrgentTasks = [];
    const materials = [];
    
    let currentTask = [];
    let inTask = false;
    let inMaterials = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Detectar início de seção de materiais
        if (line.includes('class="materials-section"') || line.includes('class="materials-header"')) {
            if (currentTask.length > 0) {
                const taskHtml = currentTask.join('\n');
                if (taskHtml.includes('checkbox-cell"><input type="checkbox" checked>')) {
                    urgentTasks.push(taskHtml);
                } else if (taskHtml.includes('checkbox-cell"><input type="checkbox">')) {
                    notUrgentTasks.push(taskHtml);
                }
                currentTask = [];
            }
            inMaterials = true;
            inTask = false;
            materials.push(line);
            continue;
        }
        
        if (inMaterials) {
            materials.push(line);
            continue;
        }
        
        // Detectar cabeçalho de seção
        if (line.includes('section-header') || line.includes('<!--')) {
            header.push(line);
            continue;
        }
        
        // Detectar início de tarefa
        if (line.includes('<tr>') && !line.includes('materials-section')) {
            if (currentTask.length > 0) {
                const taskHtml = currentTask.join('\n');
                if (taskHtml.includes('checkbox-cell"><input type="checkbox" checked>')) {
                    urgentTasks.push(taskHtml);
                } else if (taskHtml.includes('checkbox-cell"><input type="checkbox">')) {
                    notUrgentTasks.push(taskHtml);
                }
            }
            currentTask = [line];
            inTask = true;
            continue;
        }
        
        if (inTask) {
            currentTask.push(line);
            if (line.includes('</tr>')) {
                inTask = false;
            }
        }
    }
    
    // Processar última tarefa
    if (currentTask.length > 0) {
        const taskHtml = currentTask.join('\n');
        if (taskHtml.includes('checkbox-cell"><input type="checkbox" checked>')) {
            urgentTasks.push(taskHtml);
        } else if (taskHtml.includes('checkbox-cell"><input type="checkbox">')) {
            notUrgentTasks.push(taskHtml);
        }
    }
    
    // Reconstruir seção: header + urgentes + não urgentes + materiais
    return [...header, ...urgentTasks, ...notUrgentTasks, ...materials].join('\n');
}

// Dividir HTML em seções
const sectionRegex = /(<!--[^>]+-->\s*<tr>\s*<td colspan="5" class="section-header">[^<]+<\/td>\s*<\/tr>[\s\S]*?)(?=<!--[^>]+-->\s*<tr>\s*<td colspan="5" class="section-header">|<\/tbody>)/g;

let reorganizedHtml = html;
const sections = [];
let match;

while ((match = sectionRegex.exec(html)) !== null) {
    sections.push({
        original: match[0],
        reorganized: reorganizeSection(match[0])
    });
}

// Substituir seções reorganizadas
sections.forEach(section => {
    reorganizedHtml = reorganizedHtml.replace(section.original, section.reorganized);
});

// Salvar arquivo
fs.writeFileSync('index.html', reorganizedHtml, 'utf8');

console.log('✅ Tarefas reorganizadas por urgência em todas as seções!');
console.log(`📊 ${sections.length} seções processadas`);
