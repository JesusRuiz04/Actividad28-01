const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const { multiplicar } = require('./helpers/multiplicar');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/multiplicar', async (req, res) => {
  const base = parseInt(req.body.base);
  const resultado = await multiplicar(base);
  res.send(resultado);
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('generarQuiniela', () => {
    const quiniela = generarQuiniela();
    socket.emit('quinielaGenerada', quiniela);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const generarQuiniela = () => {
  const opciones = ['1', 'X', '2'];
  const quiniela = [];
  for (let i = 0; i < 15; i++) {
    const indice = Math.floor(Math.random() * opciones.length);
    quiniela.push(opciones[indice]);
  }
  return quiniela;
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});