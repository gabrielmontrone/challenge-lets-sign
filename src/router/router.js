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
    document.querySelectorAll('link[data-route-style], link[data-component-style]').forEach(link => link.remove());

    try {
      const response = await fetch(route.template);
      const html = await response.text();
      document.getElementById("app").innerHTML = html;
      document.title = route.title;

      // Carrega o CSS da rota
      if (route.styles) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = route.styles;
        link.setAttribute("data-route-style", "true");
        document.head.appendChild(link);
      }

      // Injeta componente apenas na rota /base
      if (path === "/base") {
        await loadComponent(
          "header-component",
          "src/components/header/header.html",
          "src/components/header/header.css"
        );
      }

    } catch (error) {
      console.error("Erro ao carregar rota:", error);
    }
  }
}

export default Router;
