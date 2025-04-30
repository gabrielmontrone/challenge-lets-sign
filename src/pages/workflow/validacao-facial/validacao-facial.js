import { StepManager } from '../../../utils/stepManager.js'; 

const config = {
  totalSteps: 4,
  onUpdate: (currentStep) => {
    const defaultButtons = document.querySelector('.default-buttons');
    const docButtons = document.querySelector('.document-buttons');
    const nextButton = document.getElementById('nextButton');
    const checkboxContainer = document.querySelector('.checkbox-container');
    const dots = document.querySelectorAll('.step-dot');

    // Controle do indicador e checkbox
    if (currentStep === 4) {
      document.querySelector('.steps-indicator').classList.add('d-none');
      checkboxContainer.classList.add('show', 'd-flex');
    } else {
      document.querySelector('.steps-indicator').classList.remove('d-none');
      checkboxContainer.classList.remove('show', 'd-flex');
      dots.forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.step) === currentStep);
      });
    }

    // Atualizar elementos visuais
    document.querySelectorAll('.step-img, .step-text').forEach(el => {
      const step = parseInt(el.dataset.step);
      el.classList.toggle('active', step === currentStep);
      el.classList.toggle('d-none', step !== currentStep);
    });

    // Controle de visibilidade dos botões
    if (currentStep === config.totalSteps) {
      defaultButtons?.classList.add('d-none');
      docButtons?.classList.remove('d-none');
    } else {
      defaultButtons?.classList.remove('d-none');
      docButtons?.classList.add('d-none');
    }

    // Atualizar texto do botão próximo
    if (nextButton) {
      nextButton.innerHTML = currentStep === config.totalSteps ? 'Tirar foto' : 'Avançar';
    }

    // Controle do botão voltar
    const backButton = document.getElementById('backButton');
    if (backButton) {
      backButton.style.display = currentStep === 1 ? 'none' : 'block';
    }
  }
};

const stepManager = new StepManager(config);

// Função de captura de foto
async function takePhoto(docType = '') {
  const checkbox = document.getElementById('biometriaCheckbox');
  const checkboxContainer = document.querySelector('.checkbox-container');

  if (!checkbox.checked) {
    checkboxContainer.classList.add('invalid');
    setTimeout(() => {
      checkboxContainer.classList.remove('invalid');
    }, 1500);
    return;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');

    if (!hasCamera) {
      throw new Error('NENHUMA_CAMERA');
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    alert('Câmera ativada com sucesso!');
    // Adicione aqui a lógica de captura

  } catch (error) {
    console.error('Erro:', error);
    document.querySelector('.document-buttons').classList.add('d-none');

    if (error.name === 'NotFoundError' || error.message === 'NENHUMA_CAMERA') {
      document.querySelector('.camera-fallback').classList.remove('d-none');
    } else {
      alert('Erro inesperado: ' + error.message);
    }
  }
}

// Configuração de eventos
function initEventListeners() {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('#nextButton')) {
      if (stepManager.currentStep === stepManager.totalSteps) takePhoto();
      else stepManager.next();
    }

    if (e.target.matches('#backButton, .document-buttons .back-button')) {
      stepManager.back();
    }

    if (e.target.matches('.document-option')) {
      takePhoto(e.target.dataset.doc);
    }

    if (e.target.matches('.qr-back-button')) {
      document.querySelector('.camera-fallback').classList.add('d-none');
      document.querySelector('.document-buttons').classList.remove('d-none');
    }

    if (e.target.matches('.dev-bypass')) {
      window.location.hash = '#/workflow/autenticacao-pix';
    }
  });
}

// Inicialização
function init() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.querySelectorAll('.dev-bypass').forEach(btn => btn.style.display = 'block');
  }

  stepManager.updateStepDisplay();
  initEventListeners();
}

init();