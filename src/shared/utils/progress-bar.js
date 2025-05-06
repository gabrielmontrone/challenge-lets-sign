export class ProgressBar {
    static totalSteps = 4;

    static update(currentStep) {
        let progress;
        if (currentStep === 'complete') {
            progress = 100;
        } else {
            progress = ((currentStep - 1) / this.totalSteps) * 100; // Etapas concluídas
        }

        const progressBar = document.querySelector('.progress-bar');
        const currentStepEl = document.getElementById('current-step');

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }
        if (currentStepEl) {
            currentStepEl.textContent = currentStep === 'complete'
                ? this.totalSteps
                : currentStep - 1;
        }
    }
}