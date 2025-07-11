function load() {
	const params = new URLSearchParams(window.location.search);
	const name = params.get('nome');
	const ingredients = params.get('ingredientes');

	if (
		name === null ||
		ingredients === null ||
		name.trim() === '' ||
		ingredients.trim() === ''
	) {
		window.location.href = '/';
		return;
	}

	const nameElement = document.querySelector('#name');
	const ingredientsElement = document.querySelector('#ingredients');

	if (nameElement === null || ingredientsElement === null) {
		console.error('Elementos não encontrados na página.');
		return;
	}

	nameElement.textContent = name.trim();
	ingredientsElement.textContent = ingredients.trim();
}

load();
