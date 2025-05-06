import { ProgressBar } from '../../shared/utils/progress-bar.js';
import { loadComponent } from '../../shared/utils/loadComponent.js';

// Carrega o componente
loadComponent(
  '/src/shared/components/progress-bar/progress-bar.html',
  '#progress-bar-container'
).then(() => {
  // Dispara atualização após carregamento
  window.dispatchEvent(new CustomEvent('route:updated'));
});