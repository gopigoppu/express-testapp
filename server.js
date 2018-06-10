const http = require('http');
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server started and running on http://localhost:3000');
});