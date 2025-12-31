const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determine the file path based on the request URL
    let filePath;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = './index.html';
    } else if (req.url === '/portfolio.html' || req.url === '/portfolio') {
        filePath = './portfolio.html';
    } else {
        filePath = '.' + req.url;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.webm':
            contentType = 'video/webm';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found - serve a simple 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<!DOCTYPE html><html><head><title>404 - Page Not Found</title><style>body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }h1 { color: #333; }a { color: #007bff; text-decoration: none; }a:hover { text-decoration: underline; }</style></head><body><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><p><a href="/">Go to Home</a> | <a href="/portfolio.html">Go to Portfolio</a></p></body></html>`);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available pages:');
    console.log('- http://localhost:3000/ (Login/Register)');
    console.log('- http://localhost:3000/portfolio.html (Portfolio)');
});