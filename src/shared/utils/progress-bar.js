export class ProgressBar {
  static totalSteps = 4;

  static update(currentStep, userName = '') {
    const overlay = document.getElementById('signature-overlay');
    const nameEl = document.getElementById('signature-name');

    if (nameEl && userName) {
      nameEl.textContent = userName;
    }

    if (overlay) {
      const progressPercentage = 100 - ((currentStep - 1) * 25); 
      overlay.style.width = `${progressPercentage}%`;
    }

  }
}