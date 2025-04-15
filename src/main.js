import Router from './router/router.js';

new Router();

window.addEventListener('DOMContentLoaded', () => {
    if(window.location.hash === "") {
        window.location.hash = "#/";
    }
});