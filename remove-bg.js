// Node.js script para substituir .fill-bg { fill: qualquer_cor; } por .fill-bg { fill: none; } em todos os SVGs de um diretório (sobrescrevendo os arquivos)
const fs = require('fs');
const path = require('path');

// Diretório onde estão os SVGs
const inputDir = path.join(__dirname, 'profile-3d-contrib');

// Função para substituir qualquer valor de fill dentro da classe .fill-bg
function replaceFillBgStyle(svgText) {
    return svgText.replace(
        /\.fill-bg\s*\{[^}]*fill\s*:\s*[^;]+;?[^}]*\}/gi,
        '.fill-bg { fill: none; }'
    );
}

// Processa todos os arquivos .svg no diretório
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    files.filter(file => file.endsWith('.svg')).forEach(file => {
        const filePath = path.join(inputDir, file);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Erro ao ler o arquivo ${file}:`, err);
                return;
            }

            const cleanedSvg = replaceFillBgStyle(data);

            fs.writeFile(filePath, cleanedSvg, 'utf8', err => {
                if (err) {
                    console.error(`Erro ao sobrescrever o arquivo ${filePath}:`, err);
                } else {
                    console.log(`Arquivo sobrescrito: ${filePath}`);
                }
            });
        });
    });
});
