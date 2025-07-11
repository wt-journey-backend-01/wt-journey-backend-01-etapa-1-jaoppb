import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/index.html'));
});

app.get('/sugestao', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/sugestao.html'));
});

app.get('/contato', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/contato.html'));
});

app.post('/contato', (req, res) => {
	res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
	res.sendFile(
		path.join(import.meta.dirname, '/views/contato-recebido.html'),
	);
});

app.listen(PORT, () => {
	console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
