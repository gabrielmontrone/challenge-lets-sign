export class HeaderController {
    static updateSignatureStatus(completed = false) {
        const statusElement = document.querySelector('[data-header="signature-counter"]');
        if (!statusElement) return;

        statusElement.textContent = completed
            ? '1/1 assinatura(s)'
            : '0/1 assinatura(s)'
        
        if (completed) {
            statusElement.style.color = '#2ED98A';
            statusElement.classList.add('signature-completed');
        } else {
            statusElement.style.color = '';
            statusElement.classList.remove('signature-completed');
        }
    }

    static initMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const workflowWrapper = document.querySelector('.workflow-wrapper');

        if (!mobileMenu || !workflowWrapper) return;

        // Event listeners para controle do menu
        mobileMenu.addEventListener('show.bs.collapse', () => {
            workflowWrapper.classList.add('mobile-menu-active');
        });

        mobileMenu.addEventListener('hide.bs.collapse', () => {
            workflowWrapper.classList.remove('mobile-menu-active');
        });
    }
}

// Inicialização após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    HeaderController.initMobileMenu();
});