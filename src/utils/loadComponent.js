export async function loadComponent(targetId, htmlPath, cssPath, options = {}) {
    const { retries = 3, retryDelay = 100 } = options;
    let target = null;
  
    // Tentar encontrar o elemento com retry
    for (let i = 0; i < retries; i++) {
      target = document.getElementById(targetId);
      if (target) break;
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
    }
  
    if (!target) {
      console.error(`Elemento alvo não encontrado após ${retries} tentativas: #${targetId}`);
      return false;
    }
  
    try {
      // Carregar HTML
      const htmlResponse = await fetch(htmlPath);
      if (!htmlResponse.ok) throw new Error(`HTTP error! status: ${htmlResponse.status}`);
      const html = await htmlResponse.text();
      
      // Injetar HTML
      target.innerHTML = html;
  
      // Carregar CSS condicionalmente
      if (cssPath) {
        const cssFilename = cssPath.split('/').pop();
        const isAlreadyLoaded = [...document.styleSheets].some(
          sheet => sheet.href?.includes(cssFilename)
        );
  
        if (!isAlreadyLoaded) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssPath;
          link.onerror = () => console.error(`CSS failed: ${cssPath}`);
          document.head.appendChild(link);
        }
      }
  
      return true;
  
    } catch (error) {
      console.error(`Erro no componente ${targetId}:`, error);
      target.innerHTML = `<div class="error-component">Erro no componente</div>`;
      return false;
    }
  }