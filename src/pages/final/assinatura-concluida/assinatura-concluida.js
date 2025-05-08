const userName = sessionStorage.getItem('userName') || '[Nome não encontrado]';
const nameElement = document.getElementById('final-signature-name');

if (nameElement) {
    nameElement.textContent = userName;
}

// overlay?.addEventListener('animationend', () => {
//     overlay.remove();
// });