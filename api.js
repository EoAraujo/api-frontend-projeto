const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Definir os cabeçalhos de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Resposta para requisições OPTIONS (preflight)
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Método GET: Retorna uma mensagem de boas-vindas
  if (path === '/welcome' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Bem-vindo à API!' }));
  }
  // Método POST: Recebe um nome e retorna uma saudação personalizada
  else if (path === '/greet' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { name } = JSON.parse(body);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: `Olá, ${name}!` }));
    });
  }
  // Método DELETE: Deleta um item por ID (simulado)
  else if (path === '/delete' && method === 'DELETE') {
    const id = parsedUrl.query.id;
    res.statusCode = 200;
    res.end(JSON.stringify({ message: `Item com ID ${id} foi deletado.` }));
  }
  // Rota não encontrada
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada.' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
