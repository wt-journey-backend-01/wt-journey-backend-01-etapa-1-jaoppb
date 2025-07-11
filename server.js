import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import url from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(express.urlencoded());

function populateHtml(html, values) {
	let result = html;
	for (const [id, data] of Object.entries(values)) {
		result = result.replace(
			new RegExp(`(<span .*id="${id}".*>).*(</span>)`, 'g'),
			`$1${data}$2`,
		);
	}
	return result;
}

function readHtmlFile(name) {
	const buffer = fs.readFileSync(
		path.join(import.meta.dirname, `/views/${name}.html`),
	);
	return buffer.toString();
}

app.get('/', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/index.html'));
});

app.get('/sugestao', (req, res) => {
	const html = readHtmlFile('sugestao');

	const populatedHtml = populateHtml(html, {
		name: req.query.nome || '',
		ingredients: req.query.ingredientes || '',
	});
	res.send(populatedHtml);
});

app.get('/contato', (req, res) => {
	res.sendFile(path.join(import.meta.dirname, '/views/contato.html'));
});

app.post('/contato', (req, res) => {
	res.redirect(
		url.format({
			pathname: '/contato-recebido',
			query: {
				nome: req.body.nome,
				email: req.body.email,
				subject: req.body.assunto,
				mensagem: req.body.mensagem,
			},
		}),
	);
});

app.get('/contato-recebido', (req, res) => {
	const html = readHtmlFile('contato-recebido');

	const populatedHtml = populateHtml(html, {
		name: req.query.nome || '',
		email: req.query.email || '',
		subject: req.query.subject || '',
		message: req.query.mensagem || '',
	});
	res.send(populatedHtml);
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
