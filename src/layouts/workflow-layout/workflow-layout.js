class WorkflowProgress {
  constructor() {
    // Recuperar estado anterior
    this.currentStep = Number(sessionStorage.getItem('workflowStep')) || 1;
    this.totalSteps = 4;
    this.userName = sessionStorage.getItem('workflowName') || '';

    this.currentStep = 1;
    this.totalSteps = 4;
    this.userName = '';
    this.progressElement = document.getElementById('loadingOverlay');
    this.nameElement = document.querySelector('.signature-progress');

    console.log('Elementos encontrados:', {
      progressElement: this.progressElement,
      nameElement: this.nameElement
    });

    this.setupEventListeners();
    this.updateProgress();
  }

  setupEventListeners() {
    console.log('Registrando listeners de eventos');
    window.addEventListener('nextStep', (e) => this.handleNextStep(e));
    window.addEventListener('previousStep', () => this.handlePreviousStep());
  }

  handleNextStep(event) {
    console.log('Evento nextStep recebido', event.detail);
    if (this.currentStep >= this.totalSteps) return;
    this.currentStep++;
    this.userName = event.detail.name;
    this.updateProgress();
  }

  handlePreviousStep() {
    console.log('Evento previousStep recebido');
    if (this.currentStep <= 1) return;
    this.currentStep--;
    this.updateProgress();
  }

  updateProgress() {
    // Salvar estado
    sessionStorage.setItem('workflowStep', this.currentStep);
    sessionStorage.setItem('workflowName', this.userName);

    console.log('Atualizando progresso:', {
      currentStep: this.currentStep,
      userName: this.userName
    });
    
    const progressPercentage = (this.currentStep / this.totalSteps) * 100;
    console.log('Nova porcentagem:', progressPercentage);
    
    if (this.progressElement) {
      this.progressElement.style.width = `${100 - progressPercentage}%`;
    }
    
    if (this.nameElement) {
      this.nameElement.textContent = this.userName;
    }
  }
}

// Debug de inicialização
try {
  console.log('Tentando inicializar WorkflowProgress...');
  new WorkflowProgress();
  console.log('WorkflowProgress inicializado com sucesso');
} catch (error) {
  console.error('Erro na inicialização do WorkflowProgress:', error);
}

