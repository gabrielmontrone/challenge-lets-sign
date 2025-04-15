export async function loadComponent(targetId, htmlPath, cssPath) {
    const target = document.getElementById(targetId);
    
    // Carrega o HTML
    const html = await fetch(htmlPath).then(res => res.text());
    target.innerHTML = html;
  
    // Carrega o CSS, se ainda não tiver sido carregado
    if (cssPath && !document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
    }
  }
  