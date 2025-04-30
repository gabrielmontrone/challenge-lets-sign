import { StepManager } from "../../../utils/stepManager.js";

const config = {
  totalSteps: 3,
  onUpdate: (currentStep) => {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
      nextButton.innerHTML = currentStep === 3 ? 'Confirmar PIX' : 'Avançar';
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