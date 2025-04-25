# 🧾 Validador de CNPJ com HTML, JavaScript e Bootstrap

 [![GitHub](https://img.shields.io/badge/Visit-My%20Profile-0891B2?style=flat-square&logo=github)](https://github.com/Tgentil) [![TGentil GitHub](https://img.shields.io/badge/Projeto-Validador%20de%20CNPJ-FF4500?style=flat-square)](https://tgentil.github.io/validador-cnpj/)

Este projeto é um simples validador de CNPJ implementado com HTML, JavaScript puro (Vanilla JS) e estilizado com Bootstrap. Ele permite que o usuário digite um CNPJ (com ou sem pontuação) e valide sua estrutura com base na fórmula oficial dos dígitos verificadores.

link do projeto : [Validador de CNPJ](https://tgentil.github.io/validador-cnpj/)

---

## 🚀 Como usar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` no seu navegador.
3. Digite um CNPJ no campo (ex: `12.345.678/0001-95` ou `12345678000195`).
4. Clique em "Validar".
5. Será exibido um alerta indicando se o CNPJ é válido ou inválido.

---

## 📁 Estrutura dos arquivos

```
📦 projeto-validador-cnpj/
├── index.html
├── script.js
└── README.md
```

---

## 🧠 Explicação do JavaScript (`script.js`)

### 1. 🔹 Entrada e limpeza (opcional)
```js
let cnpj = document.getElementById("cnpjInput").value;

// --- LIMPEZA OPCIONAL: REMOVER PONTUAÇÃO ---
cnpj = cnpj.replace(/[^\d]+/g, '');
```

- **Objetivo**: Captura o valor do campo de input.
- **Limpeza opcional**: Remove qualquer pontuação, espaços, ou caracteres não numéricos do CNPJ.
- **Observação**: Esse bloco pode ser comentado se quiser que a validação seja feita apenas em CNPJs digitados sem pontuação.

---

### 2. 🔸 Validação inicial
```js
if (cnpj.length !== 14 || /^(\d)+$/.test(cnpj)) {
  alert("CNPJ inválido.");
  return;
}
```

- **Objetivo**: Valida o tamanho (CNPJ deve ter 14 dígitos) e evita sequências repetidas como `00000000000000`, `11111111111111`, etc.

---

### 3. 🔹 Primeiro dígito verificador
```js
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
```

- **Objetivo**: Calcula o **primeiro dígito verificador** com base nos primeiros 12 dígitos.
- **Regra**: A fórmula usa multiplicações decrescentes de 5 a 2, e depois de 9 a 2, recomeçando.
- **Resultado**: Compara o resultado com o 13º dígito do CNPJ.

---

### 4. 🔸 Segundo dígito verificador
```js
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
```

- **Objetivo**: Calcula o **segundo dígito verificador**, agora usando os 13 primeiros dígitos (incluindo o primeiro verificador).
- **Regra**: O mesmo esquema de multiplicadores.
- **Resultado**: Compara o cálculo com o 14º dígito do CNPJ.

---

### 5. ✅ CNPJ Válido
```js
alert("CNPJ válido!");
```

- **Se chegou aqui**: Significa que os dois dígitos verificadores batem com os esperados. O CNPJ é válido!

---

## 🎨 Estilo

Este projeto usa [Bootstrap 5](https://getbootstrap.com/)

---

## 🛠 Melhorias futuras

- Aplicar máscara automática ao digitar (ex: `00.000.000/0000-00`).
