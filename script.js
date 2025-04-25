const cnpjInput = document.getElementById("cnpjInput");
const validateBtn = document.getElementById("validateBtn");
const loading = document.getElementById("loading");

// Aplica a máscara ao campo de CNPJ
IMask(cnpjInput, {
	mask: "00.000.000/0000-00",
});

async function validarCNPJ() {
	let cnpj = cnpjInput.value;

	// Verifica se o campo está vazio
	if (!cnpj.trim()) {
		alert("Por favor, insira um CNPJ.");
		return;
	}

	// --- LIMPEZA OPCIONAL: REMOVER PONTUAÇÃO ---
	cnpj = cnpj.replace(/[^\d]+/g, "");
	// --------------------------------------------

	// Verifica se o CNPJ tem 14 dígitos após limpeza
	if (cnpj.length !== 14) {
		alert("O CNPJ deve conter 14 dígitos numéricos.");
		return;
	}

	// Verifica se é uma sequência repetida (ex: 00000000000000)
	if (/^(\d)\1+$/.test(cnpj)) {
		alert("CNPJ inválido.");
		return;
	}

	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	const digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;

	// Cálculo do primeiro dígito verificador
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

	// Cálculo do segundo dígito verificador
	for (let i = tamanho; i >= 1; i--) {
		soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== parseInt(digitos.charAt(1))) {
		alert("CNPJ inválido.");
		return;
	}

	// Feedback visual: desativa botão e mostra loading
	validateBtn.disabled = true;
	loading.classList.remove("d-none");

	// Consulta a API da BrasilAPI para verificar se a empresa existe
	// e avisa o usuário se o CNPJ é válido
	// e se a empresa foi encontrada ou não.
	try {
		const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const data = await response.json();

		if (data.razao_social) {
			alert(`Empresa encontrada: ${data.razao_social}`);
		} else {
			alert("Empresa não encontrada, mas o CNPJ é válido.");
		}
	} catch (error) {
		if (error.message.includes("429")) {
			alert("Limite de requisições excedido. Tente novamente mais tarde.");
		} else if (error.message.includes("404")) {
			alert("Empresa não encontrada, mas o CNPJ é válido.");
		} else if (error.message.includes("500")) {
			alert("Erro interno no servidor. Tente novamente mais tarde.");
		} else if (error.message.includes("503")) {
			alert("Serviço temporariamente indisponível. Tente novamente mais tarde.");
		} else if (error.message.includes("524")) {
			alert("Tempo limite de requisição excedido. Tente novamente mais tarde.");
		} else {
			alert("Erro ao consultar a base da Receita. CNPJ válido.");
		}
		console.error("Erro na consulta:", error);
	} finally {
		// Reativa o botão e oculta loading
		validateBtn.disabled = false;
		loading.classList.add("d-none");
	}
}
