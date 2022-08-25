const http = require('http');
const {Server} = require('socket.io');
const fs = require('fs');
const port = 8080;

const server = http.createServer((req, res)=>{
    fs.readFile('./home.html',"utf8",(err, data)=>{
        if(err){
            throw new Error(err.message);
        }
        res.write(data);
        res.end();
    })
})



const io = new Server(server);

io.on('connection',socket=>{
    let nameUser='';
    socket.on('user-join',name=>{
        nameUser = name;
    })
    socket.on('btn-click',data=>{
        let message = `${data.name}: ${data.message}`;
        io.emit('say-message', message);
    })
    socket.on('disconnect',()=>{
        let message = `${nameUser} disconnect`;
        socket.broadcast.emit('user-disconnect',message);
    })
})

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})