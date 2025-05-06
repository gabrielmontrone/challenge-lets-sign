import Router from './router/router.js';
import { ProgressObserver } from './shared/utils/progress-observer.js';

new Router();
ProgressObserver.init();

// Remove 'index.html' da URL se estiver presente
if (window.location.pathname.includes('index.html')) {
  window.history.replaceState(null, '', '/');
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === "") {
        window.location.hash = "#/";
    }
});

