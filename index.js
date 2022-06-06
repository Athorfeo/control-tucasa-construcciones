var http = require('http');
var fs = require('fs');
var path = require('path');

let config = JSON.parse(fs.readFileSync('config.json'));

http.createServer(function (request, response) {
    console.log('request: ', request.url);
    
    var filePath = './' + config.srcPath + request.url;
    if (filePath == ('./' + config.srcPath + '/')) {
        filePath = filePath + 'index';
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    if (extname == '') {
        extname = ".html";
        filePath = filePath + '.html';
    }

    console.log('FilePath: ' + filePath);

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';
    console.log('ContentType: ', contentType);

    fs.readFile(filePath, function(error, content) {
        if (error) {
            console.log('error: ', error);
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(config.port);
console.log('Server running at http://127.0.0.1:' + config.port + '/');
console.log('Configurations: ', config);