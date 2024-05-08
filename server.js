/**
    * @description      : 
    * @author           : Mário Jorge Ribeiro
    * @group            : 
    * @created          : 08/05/2024 - 11:59:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 08/05/2024
    * - Author          : Mário Jorge Ribeiro
    * - Modification    : 
**/
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const cors = require('cors'); // Importa o pacote cors

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
});

// Adiciona o middleware cors ao servidor Socket.IO
const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET']
    }
});

io.on('connection', (socket) => {
    console.log('Client connected - Socket');

    // Envia dados mockados de produtos para o cliente
    const products = [
        { id: 1, name: 'Product 1', price: 10.89 },
        { id: 2, name: 'Product 2', price: 20.99 },
        { id: 3, name: 'Product 3', price: 30.49 },
        { id: 4, name: 'Product One', price: 40.89 },
        { id: 5, name: 'Product Master', price: 4000 },
        { id: 6, name: 'Produto Outro', price: 1300 },
        { id: 6, name: 'Bala de Menta', price: 1550 },
    ];
    io.emit('products', products);
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
