import { ProgressBar } from './progress-bar.js';

export class ProgressObserver {
    static init() {
      window.addEventListener('route:updated', (e) => {
        const { route } = e.detail;
        
        if (route?.progress === 'complete') {
          ProgressBar.update('complete');
        } else if (route?.step) {
          ProgressBar.update(route.step);
        }
      });
    }
  }