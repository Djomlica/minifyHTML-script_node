const fs = require('fs').promises;
const path = require('path');
const minify = require('html-minifier').minify;

async function readHTMLFile(filePath) {
    try {
        const htmlContent = await fs.readFile(filePath, 'utf-8');
        return htmlContent;
    } catch (error) {
        console.error('Error reading HTML file:', error);
        return null;
    }
}

async function minifyHTML(htmlContent) {
    try {
        const minifiedHTML = minify(htmlContent, {
            collapseWhitespace: true,   // Minify whitespaces
            removeComments: true,       // Remove HTML comments
        });

        return minifiedHTML;
    } catch (error) {
        console.error('Error minifying HTML:', error);
        return '';
    }
}

async function findIndexHTML(directory) {
    try {
        const indexFilePath = path.join(directory, 'index.html');
        const htmlContent = await readHTMLFile(indexFilePath);

        if (htmlContent) {
            // Minify HTML
            const minifiedHTML = await minifyHTML(htmlContent);

            // Save the minified HTML to minified.html
            const minifiedFilePath = path.join(directory, 'minified.html');
            await fs.writeFile(minifiedFilePath, minifiedHTML);
            console.log(`Minified HTML content saved as ${minifiedFilePath}`);
        } else {
            console.log('No index.html file found in the directory.');
        }
    } catch (error) {
        console.error(`Error reading directory or minifying:`, error);
    }
}

const directoryPath = './';

findIndexHTML(directoryPath);
