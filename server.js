import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/index.html'));
});

app.get('/sugestao', (req, res) => {
	const buffer = fs.readFileSync(
		path.join(import.meta.dirname, '/views/sugestao.html'),
	);
	const html = buffer.toString();
	const populateWithRegex = (str, id, data) => {
		return str.replace(
			new RegExp(`(<span .*id="${id}".*>).*(</span>)`, 'g'),
			`$1${data}$2`,
		);
	};

	const populatedHtml = populateWithRegex(
		populateWithRegex(html, 'name', req.query.nome || ''),
		'ingredients',
		req.query.ingredientes || '',
	);
	res.send(populatedHtml);
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

app.get('/api/lanches', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/public/data/lanches.json'));
});

app.use((req, res) => {
	res.status(404).sendFile(
		path.join(import.meta.dirname, '/public/404.html'),
	);
});

app.listen(PORT, () => {
	console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
