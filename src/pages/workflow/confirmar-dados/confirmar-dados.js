document.addEventListener('DOMContentLoaded', () => {
  // Atualiza título e passo no LAYOUT
  document.getElementById('workflow-titulo').textContent = 'Confirmando Dados';
  document.getElementById('workflow-passo').textContent = 'Passo 1 de 3';

  // Lógica do formulário
  document.getElementById('form-dados').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.hash = '#/workflow/assinar';
  });
});