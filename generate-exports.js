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

// Adicione uma mensagem de log para verificar o caminho da pasta
console.log(`Verificando arquivos em: ${componentsDir}`);

fs.readdir(componentsDir, (err, files) => {
    if (err) {
        console.error(`Erro ao ler a pasta de componentes: ${targetDir}`, err);
        return;
    }

    // Exiba os arquivos encontrados para debug
    console.log('Arquivos encontrados:', files);

    const exports = files
        .filter((file) => file !== 'index.ts' && (file.endsWith('.ts') || file.endsWith('.tsx'))) // Inclui arquivos .ts e .tsx
        .map((file) => `export * from './${file.replace(/\.(ts|tsx)$/, '')}';`) // Remove a extensão ao gerar o export
        .join('\n');

    // Adicione um log para exibir o conteúdo gerado
    console.log('Conteúdo gerado para o index.ts:', exports);

    if (!exports) {
        console.log('Nenhum arquivo .ts ou .tsx encontrado para exportar.');
    }

    fs.writeFile(indexPath, exports, (err) => {
        if (err) {
            console.error('Erro ao escrever o arquivo index.ts:', err);
        } else {
            console.log(`Arquivo index.ts gerado com sucesso na pasta src/${targetDir}!`);
        }
    });
});
