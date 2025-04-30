let currentStep = 1;
const totalSteps = 4;

// Função principal de atualização
function updateStepDisplay() {
    const defaultButtons = document.querySelector('.default-buttons');
    const docButtons = document.querySelector('.document-buttons');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const dots = document.querySelectorAll('.step-dot');
    const checkboxContainer = document.querySelector('.checkbox-container');

    // Bolinhas e Checkbox
    if (currentStep === 4) {
        document.querySelector('.steps-indicator').classList.add('d-none');
        checkboxContainer.classList.add('show', 'd-flex');
    } else {
        document.querySelector('.steps-indicator').classList.remove('d-none');
        checkboxContainer.classList.remove('show', 'd-flex');

        dots.forEach(dot => {
            const step = parseInt(dot.dataset.step);
            dot.classList.toggle('active', step === currentStep);
        });
    }

    // Atualizar elementos visuais
    document.querySelectorAll('.step-img, .step-text').forEach(el => {
        const step = parseInt(el.dataset.step);
        el.classList.toggle('active', step === currentStep);
        el.classList.toggle('d-none', step !== currentStep);
    });

    // Controle dos botões
    if (currentStep === totalSteps) {
        defaultButtons?.classList.add('d-none');
        docButtons?.classList.remove('d-none');
    } else {
        defaultButtons?.classList.remove('d-none');
        docButtons?.classList.add('d-none');
    }

    // Texto do botão próximo
    if (nextButton) {
        nextButton.innerHTML = currentStep === totalSteps ? 'Tirar foto' : 'Avançar';
    }

    // Visibilidade do botão voltar
    if (backButton) {
        backButton.style.display = currentStep === 1 ? 'none' : 'block';
    }
}

// Funções de navegação
function handleNext() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
    }
}

function handleBack() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

// Função de captura
async function takePhoto(docType = '') {
    const checkbox = document.getElementById('biometriaCheckbox');
    const checkboxContainer = document.querySelector('.checkbox-container');

    if (!checkbox.checked) {
        checkboxContainer.classList.add('invalid');
        setTimeout(() => {
            checkboxContainer.classList.remove('invalid');
        }, 1500); // Tempo total da animação (0.5s * 3 repetições)
        return;
    }
    try {
        // Verifica se há câmeras disponíveis
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');

        if (!hasCamera) {
            throw new Error('NENHUMA_CAMERA');
        }

        // Tenta acessar a câmera
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        // Caso tenha conseguido acessar
        alert('Câmera ativada com sucesso!');
        // Lógica de captura aqui

    } catch (error) {
        console.error('Erro:', error);

        // Esconde botões de documento
        document.querySelector('.document-buttons').classList.add('d-none');

        // Mostra QR Code apenas para erros de câmera não encontrada
        if (error.name === 'NotFoundError' || error.message === 'NENHUMA_CAMERA') {
            document.querySelector('.camera-fallback').classList.remove('d-none');
        } else {
            alert('Erro inesperado: ' + error.message);
        }
    }
}

// Configuração de eventos 
function initEventListeners() {
    // Delegation para elementos dinâmicos
    document.body.addEventListener('click', (e) => {
        // Botão Avançar
        if (e.target.matches('#nextButton')) {
            if (currentStep === totalSteps) takePhoto();
            else handleNext();
        }

        // Botão Voltar
        if (e.target.matches('#backButton, .document-buttons .back-button')) {
            handleBack();
        }

        // Botões de documento
        if (e.target.matches('.document-option')) {
            takePhoto(e.target.dataset.doc);
        }

        if (e.target.matches('.qr-back-button')) {
            document.querySelector('.camera-fallback').classList.add('d-none');
            document.querySelector('.document-buttons').classList.remove('d-none');
        }

        // Botão de bypass para desenvolvimento
        if (e.target.matches('.dev-bypass')) {
            window.location.hash = '#/proxima-rota';
        }

    });
}

// Inicialização 
function init() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.querySelectorAll('.dev-bypass').forEach(btn => btn.style.display = 'block');
    }

    updateStepDisplay();
    initEventListeners();
}

init();