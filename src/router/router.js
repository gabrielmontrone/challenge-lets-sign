class Router {
  constructor() {
    this.routes = {
      "/": {
        template: "src/templates/home/home.html",
        styles: "src/templates/home/home.css",
        title: "Home | Let's Sign"
      },
      "/confirmar-dados": {
        template: "src/templates/confirmar-dados/confirmar-dados.html",
        title: "Confirmar Dados | Let's Sign"
      }
    };
    this.init();
  }

  init() {
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }

  async handleRoute() {
    const path = window.location.hash.substring(1) || "/";
    const route = this.routes[path] || this.routes["/"];
  
    // Remove estilos anteriores (se houver)
    document.querySelectorAll('link[data-route-style]').forEach(link => link.remove());
  
    try {
      // Carrega o HTML
      const response = await fetch(route.template);
      const html = await response.text();
      document.getElementById("app").innerHTML = html;
      document.title = route.title;
  
      // Carrega o CSS específico da rota (se existir)
      if (route.styles) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = route.styles;
        link.setAttribute("data-route-style", "true"); 
        document.head.appendChild(link);
      }
  
    } catch (error) {
      console.error("Erro ao carregar rota:", error);
    }
  }
}

export default Router;