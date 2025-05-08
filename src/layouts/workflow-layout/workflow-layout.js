import { ProgressBar } from '../../shared/components/progress-bar/progress-bar.js';
import { ProgressObserver } from '../../shared/utils/progress-observer.js';
import { loadComponent } from '../../shared/utils/loadComponent.js';

loadComponent(
  '/src/layouts/workflow-layout/workflow-layout.html',
  '#app'
).then(() => {
  // Recupera o nome salvo
  ProgressObserver.init();
  const userName = sessionStorage.getItem('userName') || '';
  ProgressBar.update(1, userName);
});