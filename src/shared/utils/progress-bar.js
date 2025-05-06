export class ProgressBar {
    static totalSteps = 4; 
  
    static update(currentStep) {
      const progress = (currentStep / this.totalSteps) * 100;
      const progressBar = document.querySelector('.progress-bar');
      const currentStepEl = document.getElementById('current-step');
      
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (currentStepEl) currentStepEl.textContent = currentStep;
    }
  }