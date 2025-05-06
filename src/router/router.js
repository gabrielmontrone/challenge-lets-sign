import { loadGlobalComponents } from "../utils/componentManager.js";
import { injectHomeContent } from "../layouts/home-layout/home-layout.js";
import { HeaderController } from "../components/header/header.js";
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

    document.querySelectorAll('link[data-route-style]').forEach(link => link.remove());

    try {
      // 1. Carregar layout base
      const layoutResponse = await fetch(route.layout || "src/layouts/home-layout/home-layout.html");
      const layoutHTML = await layoutResponse.text();

      // 2. Aplicar layout
      document.getElementById("app").innerHTML = layoutHTML;

      // 2.1 Aguardar renderização do DOM
      await new Promise(resolve => {
        requestAnimationFrame(() => {
          setTimeout(resolve, 50);
        });
      });

      // 3. Carregar componentes globais primeiro
      await loadGlobalComponents();

      // 4. Carregar conteúdo específico
      const contentResponse = await fetch(route.template);
      const contentHTML = await contentResponse.text();

      // 5. Lógica de injeção de conteúdo 
      switch (path) {
        case "/":
          injectHomeContent(contentHTML);
          break;

        case "/assinatura-concluida": 
          const mainContent = document.querySelector('.main-content .container');
          if (mainContent) mainContent.innerHTML = contentHTML;
          break;

        default:
          const workflowContent = document.getElementById("workflow-content");
          if (workflowContent) workflowContent.innerHTML = contentHTML;
          break;
      }

      // 6. Atualizar títulos do workflow
      if (route.titulo && route.passo) {
        const tituloEl = document.getElementById('workflow-titulo');
        const passoEl = document.getElementById('workflow-passo');
        if (tituloEl) tituloEl.textContent = route.titulo;
        if (passoEl) passoEl.textContent = route.passo;
      }

      // 7. Carregar CSS específico
      if (route.styles) {
        route.styles.forEach(style => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = style;
          link.setAttribute("data-route-style", "true");
          document.head.appendChild(link);
        });
      }

      // 8. Carregar JS específico da página (atualizado)
      if (route.scripts) {
        route.scripts.forEach(scriptSrc => {
          // Remove scripts antigos
          document.querySelectorAll(`script[src="${scriptSrc}"]`).forEach(el => el.remove());
          
          const script = document.createElement("script");
          script.src = scriptSrc;
          
          // Mantém type="module" se necessário
          if (scriptSrc.includes('workflow-layout.js') || scriptSrc.includes('validacao-facial.js') || scriptSrc.includes('autenticacao-pix.js')) {
            script.type = "module";
          }
          
          script.defer = true; 
          document.body.appendChild(script);
        });
      }

      document.title = route.title;

      // 9. Assinatura concluída
      if (path === '/assinatura-concluida') {
        HeaderController.updateSignatureStatus(true);
      } else {
        HeaderController.updateSignatureStatus(false);
      }

      // 10. Disparar evento de DOM pronto
      window.dispatchEvent(new CustomEvent('app:domready', {
        detail: { path }
      }));

    } catch (error) {
      console.error("Erro ao carregar rota:", error);
    }
  }
}

export default Router;