export async function loadComponent(targetId, htmlPath, cssPath) {
  const target = document.getElementById(targetId);
  
  // Verificação robusta do elemento target
  if (!target) {
      console.error(`Elemento alvo não encontrado: #${targetId}`);
      return false;
  }

  try {
      // Carrega o HTML com tratamento de erro
      const htmlResponse = await fetch(htmlPath);
      if (!htmlResponse.ok) throw new Error(`Falha ao carregar HTML: ${htmlResponse.status}`);
      const html = await htmlResponse.text();
      
      // Atualiza o DOM
      target.innerHTML = html;

      // Carrega o CSS condicionalmente
      if (cssPath) {
          const existingStyles = [...document.styleSheets].some(sheet => 
              sheet.href?.includes(cssPath.split('/').pop())
          );

          if (!existingStyles) {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = cssPath;
              link.onerror = () => console.error(`Falha ao carregar CSS: ${cssPath}`);
              document.head.appendChild(link);
          }
      }

      return true;

  } catch (error) {
      console.error(`Erro no componente ${targetId}:`, error);
      target.innerHTML = `<div class="error">Erro ao carregar o componente</div>`;
      return false;
  }
}