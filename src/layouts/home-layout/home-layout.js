export const injectHomeContent = async () => {
    try {
      // Carrega o template da página
      const response = await fetch("src/pages/home/pagina-inicial/pagina-inicial.html");
      const contentHTML = await response.text();
  
      // Processa a injeção
      const contentContainer = document.createElement('div');
      contentContainer.innerHTML = contentHTML;
  
      const leftContent = contentContainer.querySelector('#left-content');
      const rightContent = contentContainer.querySelector('#right-content');
  
      if (leftContent) {
        document.getElementById('left-content').replaceWith(leftContent);
      }
  
      if (rightContent) {
        document.getElementById('right-content').replaceWith(rightContent);
      }
  
    } catch (error) {
      console.error("Erro ao injetar conteúdo da home:", error);
    }
  };