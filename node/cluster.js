const cluster = require('node:cluster');
const http = require('node:http');
const OS = require('node:os');

console.log(`Number of CPUs: ${OS.cpus().length}`);


if(cluster.isMaster){
    console.log(`Master process ${process.pid} s running.`);
    cluster.fork();
    cluster.fork();
}else{
    console.log(`Worker process ${process.pid} s running.`);
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
    });
}

