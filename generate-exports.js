/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

// Obtenha o argumento da linha de comando para escolher a pasta
const targetDir = process.argv[2];

if (!targetDir) {
    console.error('Por favor, forneça o nome da pasta como argumento.');
    process.exit(1);
}

// Usa o diretório 'src' como base
const componentsDir = path.join(process.cwd(), 'src', targetDir);
const indexPath = path.join(componentsDir, 'index.ts');

// Função para ler arquivos recursivamente
const getExports = (dir) => {
    const files = fs.readdirSync(dir);
    let exports = '';

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Se for uma pasta, chama recursivamente
            exports += getExports(filePath);
        } else if (file !== 'index.ts' && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
            // Se for um arquivo .ts ou .tsx, adiciona o export
            const relativePath = path.relative(componentsDir, filePath).replace(/\.(ts|tsx)$/, '');
            exports += `export * from './${relativePath}';\n`;
        }
    });

    return exports;
};

// Adicione uma mensagem de log para verificar o caminho da pasta
console.log(`Verificando arquivos em: ${componentsDir}`);

try {
    const exports = getExports(componentsDir);

    // Adicione um log para exibir o conteúdo gerado
    console.log('Conteúdo gerado para o index.ts:', exports);

    if (!exports) {
        console.log('Nenhum arquivo .ts ou .tsx encontrado para exportar.');
    }

    fs.writeFileSync(indexPath, exports.trim());
    console.log(`Arquivo index.ts gerado com sucesso na pasta src/${targetDir}!`);
} catch (err) {
    console.error(`Erro ao processar a pasta de componentes: ${targetDir}`, err);
}
