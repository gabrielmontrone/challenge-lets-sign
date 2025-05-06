import { StepManager } from "../../../utils/stepManager.js";

const config = {
  totalSteps: 3,
  onUpdate: (currentStep) => {
    const nextButton = document.getElementById('nextButton');
    const stepsIndicator = document.querySelector('.steps-indicator');
    const devBypassButton = document.querySelector('.dev-bypass');
    
    // Esconder bolinhas no passo 3
    if (currentStep === 3) {
        stepsIndicator.classList.add('d-none-indicator');
        nextButton.classList.add('confirm-step');
        devBypassButton.style.display = 'block'; 
      } else {
        stepsIndicator.classList.remove('d-none-indicator');
        nextButton.classList.remove('confirm-step');
        devBypassButton.style.display = 'none';
      }

    if (nextButton) {
      nextButton.innerHTML = currentStep === 3 ? 'Copiar código' : 'Avançar';
    }
  }
};

const stepManager = new StepManager(config);

function initEventListeners() {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('#nextButton')) {
      if (stepManager.currentStep === stepManager.totalSteps) confirmPix();
      else stepManager.next();
    }

    if (e.target.matches('#backButton')) {
      stepManager.back();
    }

    if (e.target.matches('.dev-bypass')) {
      e.preventDefault();
      window.location.href = '#/assinatura-concluida'; // Atualizar dps
    }
  });
}

function confirmPix() {
  // Lógica específica para confirmação do PIX
  console.log('PIX confirmado');
}

function init() {
  stepManager.updateStepDisplay();
  initEventListeners();
}

init();