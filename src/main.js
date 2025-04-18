import Router from './router/router.js';

new Router();

// Remove 'index.html' da URL se estiver presente
if (window.location.pathname.includes('index.html')) {
  window.history.replaceState(null, '', '/');
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === "") {
        window.location.hash = "#/";
    }
});