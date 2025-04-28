// ========= RECUPERAR ESTADO DO WORKFLOW ========= //
const storedName = sessionStorage.getItem('workflowName');
if (storedName) {
  const nameElement = document.querySelector('.signature-progress');
  if (nameElement) {
    nameElement.textContent = storedName;
  } else {
    console.error('Elemento .signature-progress não encontrado');
  }
}


// Função para aplicar o efeito 3D
function applyHoverEffect(imageElement) {
  imageElement.addEventListener('mousemove', (e) => {
    const rect = imageElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 99;
    const rotateX = (centerY - y) / 99;
    const perspective = 1000;
    const scale = 1.01;

    imageElement.style.transform = `
      perspective(${perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
    `;
  });

  imageElement.addEventListener('mouseleave', () => {
    imageElement.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
}

// Aplicar a ambas as imagens
const defaultImage = document.querySelector('.default-image');
const previewImage = document.querySelector('.preview-image');

applyHoverEffect(defaultImage);
applyHoverEffect(previewImage);

// Enviar arquivo
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const container = document.getElementById('selectedFileContainer');
const fileName = document.getElementById('fileName');

// Event Listener para escolher arquivo 
fileInput.addEventListener('change', function(e) {
  if(this.files.length > 0) {
    uploadButton.classList.add('d-none');
    container.classList.remove('d-none');
    fileName.textContent = this.files[0].name;

    // Pré-visualização
    const file = this.files[0];
    if(file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewImage.classList.remove('d-none');
        defaultImage.classList.add('d-none');
      }
      
      reader.readAsDataURL(file);
    } else {
      // Mantém a imagem padrão se não for imagem
      previewImage.classList.add('d-none');
      defaultImage.classList.remove('d-none');
    }
  }
});

// Event Listener para Escolher Outro 
document.getElementById('chooseAnotherButton').addEventListener('click', () => {
  fileInput.value = '';
  uploadButton.classList.remove('d-none');
  container.classList.add('d-none');
  
  // Resetar pré-visualização
  previewImage.src = '#';
  previewImage.classList.add('d-none');
  defaultImage.classList.remove('d-none');
  
  fileInput.click();
});

// Event Listener para Confirmar 
document.getElementById('confirmButton').addEventListener('click', () => {
  if(fileInput.files.length > 0) {
    window.location.hash = '#/workflow/valide-sua-facial';
  } else {
    alert('Por favor, selecione um arquivo primeiro!');
  }
});
