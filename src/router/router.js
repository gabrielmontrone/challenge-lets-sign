import { loadComponent } from "./../utils/loadComponent.js";
import routes from "./routes.js";

class Router {
  constructor() {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  async handleRoute() {
    const path = window.location.hash.substring(1) || "/";
    const route = this.routes[path] || this.routes["/"];
  
    // Remove estilos antigos
    document.querySelectorAll('link[data-route-style]').forEach(link => link.remove());
  
    try {
        // 1. Carrega LAYOUT BASE primeiro
        const layoutResponse = await fetch(route.layout || "src/layouts/default-layout.html");
        const layoutHTML = await layoutResponse.text();
        
        // 2. Carrega CONTEÚDO ESPECÍFICO da página
        const contentResponse = await fetch(route.template);
        const contentHTML = await contentResponse.text();
    
        // 3. Insere apenas o layout no DOM
        document.getElementById("app").innerHTML = layoutHTML; 
    
        // 4. Processa o conteúdo em um container temporário
        const contentContainer = document.createElement('div');
        contentContainer.innerHTML = contentHTML;
        
        // 5. Injeta dinamicamente nas áreas do layout
        const leftContent = contentContainer.querySelector('#left-content');
        const rightContent = contentContainer.querySelector('#right-content');
        
        if (leftContent) {
            document.getElementById('left-content').replaceWith(leftContent);
        }
        
        if (rightContent) {
            document.getElementById('right-content').replaceWith(rightContent);
        }
    
        // 6. Carrega CSS (layout + conteúdo)
        if (route.styles) {
            route.styles.forEach(style => {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = style;
                link.setAttribute("data-route-style", "true");
                document.head.appendChild(link);
            });
        }
    
        document.title = route.title;
  
    } catch (error) {
        console.error("Erro ao carregar rota:", error);
    }
}
}

export default Router;
