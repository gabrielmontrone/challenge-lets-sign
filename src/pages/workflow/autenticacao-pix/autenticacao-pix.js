import { StepManager } from "../../../utils/stepManager.js";

const config = {
  totalSteps: 3,
  onUpdate: (currentStep) => {
    const nextButton = document.getElementById('nextButton');
    const stepsIndicator = document.querySelector('.steps-indicator');
    
    // Esconder bolinhas no passo 3
    if (currentStep === 3) {
        stepsIndicator.classList.add('d-none-indicator');
        nextButton.classList.add('confirm-step');
      } else {
        stepsIndicator.classList.remove('d-none-indicator');
        nextButton.classList.remove('confirm-step');
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