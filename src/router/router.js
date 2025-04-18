import { loadGlobalComponents } from "../utils/componentManager.js";
import { injectHomeContent } from "../layouts/home-layout/home-layout.js";
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
        const layoutResponse = await fetch(route.layout || "src/layouts/default-layout.html");
        const layoutHTML = await layoutResponse.text();
        
        // 2. Carregar conteúdo específico
        const contentResponse = await fetch(route.template);
        const contentHTML = await contentResponse.text();

        // 3. Aplicar layout
        document.getElementById("app").innerHTML = layoutHTML;

        // 4. Atualizar títulos do workflow (NOVA SEÇÃO)
        if(route.titulo && route.passo) {
            const tituloEl = document.getElementById('workflow-titulo');
            const passoEl = document.getElementById('workflow-passo');
            if(tituloEl) tituloEl.textContent = route.titulo;
            if(passoEl) passoEl.textContent = route.passo;
        }

        // 5. Lógica de injeção de conteúdo (HOME PRESERVADA)
        switch(path) {
            case "/":
                injectHomeContent(contentHTML);
                break;
            
            default:
                if(route.target) {
                    const targetElement = document.getElementById(route.target);
                    if(targetElement) targetElement.innerHTML = contentHTML;
                }
                break;
        }

        // 6. Carregar componentes globais (header)
        await loadGlobalComponents();

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

        // 8. Carregar JS específico da página
        if(route.script) {
            const script = document.createElement("script");
            script.src = route.script;
            script.type = "module";
            document.body.appendChild(script);
        }

        document.title = route.title;

    } catch (error) {
        console.error("Erro ao carregar rota:", error);
    }
  }
}

export default Router;