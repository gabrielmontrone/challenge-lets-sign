import { ProgressBar } from './progress-bar.js';

export class ProgressObserver {
  static init() {
    window.addEventListener('route:updated', (e) => {
      const { route } = e.detail;
      const userName = sessionStorage.getItem('userName') || '';
      
      if (route?.step) {
        ProgressBar.update(route.step, userName);
      }
    });
  }
}