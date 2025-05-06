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
  }