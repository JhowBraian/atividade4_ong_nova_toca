document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os inputs de CPF
  const cpfInputs = document.querySelectorAll('input[name="cpf"]');
  cpfInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
      valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      this.value = valor;
    });
  });

  // Seleciona todos os inputs de telefone
  const telefoneInputs = document.querySelectorAll('input[name="telefone"]');
  telefoneInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 11) valor = valor.slice(0, 11);
      valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
      if (valor.length > 10) {
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
      } else {
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
      }
      this.value = valor;
    });
  });

  // Seleciona todos os inputs de CEP
  const cepInputs = document.querySelectorAll('input[name="cep"]');
  cepInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length > 8) valor = valor.slice(0, 8);
      valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
      this.value = valor;
    });
  });
});