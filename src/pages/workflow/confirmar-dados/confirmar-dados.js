const form = document.getElementById('form-dados');
const cpfInput = document.getElementById('cpf');
const birthdateInput = document.getElementById('birthdate');

// Máscara de CPF
if (cpfInput) {
  cpfInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    e.target.value = value;
  });
}

// Aniversário
document.getElementById('birthdate').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\D/g, ''); // remove tudo que não for número

  if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
  if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

  e.target.value = value;
});

// Checked box
// Funções de Validação
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  
  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  return resto === parseInt(cpf.charAt(10));
}

function validarData(data) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(data)) return false;
  
  const [dia, mes, ano] = data.split('/').map(Number);
  const dataObj = new Date(ano, mes - 1, dia);
  
  return (
      dataObj.getDate() === dia &&
      dataObj.getMonth() === mes - 1 &&
      dataObj.getFullYear() === ano
  );
}

// Máscaras de Input
document.getElementById('cpf').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
               .replace(/(\d{3})(\d)/, '$1.$2')
               .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  e.target.value = value.substring(0, 14);
});

document.getElementById('birthdate').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1/$2')
               .replace(/(\d{2})(\d)/, '$1/$2');
  e.target.value = value.substring(0, 10);
});

// Sistema de Validação Principal
const entryAreas = document.querySelectorAll('.entryarea');

entryAreas.forEach(entryarea => {
  const input = entryarea.querySelector('input');
  let timeout;
  let loadingTimeout;

  input.addEventListener('input', (e) => {
      clearTimeout(timeout);
      clearTimeout(loadingTimeout);
      
      // Reseta estados
      entryarea.classList.remove('loading', 'success', 'error');
      input.classList.remove('error-border');

      timeout = setTimeout(() => {
          const value = input.value.trim();
          
          if (!value) {
              entryarea.classList.add('error');
              input.classList.add('error-border');
          } else {
              entryarea.classList.add('loading');
              
              loadingTimeout = setTimeout(() => {
                  entryarea.classList.remove('loading');
                  
                  // Validação específica para cada campo
                  if (input.id === 'cpf') {
                      const cpfLimpo = value.replace(/\D/g, '');
                      if (!validarCPF(cpfLimpo)) {
                          entryarea.classList.add('error');
                          input.classList.add('error-border');
                      } else {
                          entryarea.classList.add('success');
                      }
                  } else if (input.id === 'birthdate') {
                      if (!validarData(value)) {
                          entryarea.classList.add('error');
                          input.classList.add('error-border');
                      } else {
                          entryarea.classList.add('success');
                      }
                  } else {
                      entryarea.classList.add('success');
                  }
              }, 2000);
          }
      }, 500);
  });

  input.addEventListener('blur', () => {
      if (!input.value.trim()) {
          entryarea.classList.add('error');
          input.classList.add('error-border');
      }
  });
});
