function validarCNPJ() {
	let cnpj = document.getElementById("cnpjInput").value;

	// --- LIMPEZA OPCIONAL: REMOVER PONTUAÇÃO ---
	// Descomente a linha abaixo para remover pontos, barras e traços automaticamente:
	cnpj = cnpj.replace(/[^\d]+/g, "");
	// --------------------------------------------

	if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
		alert("CNPJ inválido.");
		return;
	}

	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	const digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== parseInt(digitos.charAt(0))) {
		alert("CNPJ inválido.");
		return;
	}

	tamanho += 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== parseInt(digitos.charAt(1))) {
		alert("CNPJ inválido.");
		return;
	}

	alert("CNPJ válido!");
}
