export class StepManager {
    constructor(config) {
      this.currentStep = 1;
      this.totalSteps = config.totalSteps;
      this.stepConfig = config;
    }
  
    updateStepDisplay() {
      // Elementos comuns
      const nextButton = document.getElementById('nextButton');
      const backButton = document.getElementById('backButton');
      const dots = document.querySelectorAll('.step-dot');
  
      // Atualizar bolinhas de progresso
      dots.forEach(dot => {
        const step = parseInt(dot.dataset.step);
        dot.classList.toggle('active', step === this.currentStep);
      });
  
      // Atualizar elementos visuais
      document.querySelectorAll('.step-img, .step-text').forEach(el => {
        const step = parseInt(el.dataset.step);
        el.classList.toggle('active', step === this.currentStep);
        el.classList.toggle('d-none', step !== this.currentStep);
      });
  
      // Controle dos botões
      if (backButton) {
        backButton.style.display = this.currentStep === 1 ? 'none' : 'block';
      }
  
      // Chamar configuração específica da página
      if (this.stepConfig.onUpdate) {
        this.stepConfig.onUpdate(this.currentStep);
      }
    }
  
    next() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.updateStepDisplay();
      }
    }
  
    back() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.updateStepDisplay();
      }
    }
  }