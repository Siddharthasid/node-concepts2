const http = require('node:http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('home page');
    }else if(req.url === '/slow-page'){
        for(let i=0; i<=6000000000; i++){}
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('slow page');
    }
});

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
})