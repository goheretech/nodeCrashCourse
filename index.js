const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

    //Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //Check ext
    switch(extname){
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
            contentType = 'image/jpg';
            break;        
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    response.writeHead(200, {'Content-Type': 'text/html' });
                    response.end(content, 'utf8');
                })
            }else{
                //Some serve error
                response.writeHead(500);
                response.end(`Server Error: ${err.code}`);
            }
        }else{
            //Success
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');
        }
    });

});

const PORT = process.env.PORT || 4400;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
