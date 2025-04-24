const routes = {
  "/": {
    layout: "src/layouts/home-layout/home-layout.html", 
    template: "src/pages/home/pagina-inicial/pagina-inicial.html",     
    styles: [
      "src/layouts/home-layout/home-layout.css",       
      "src/pages/home/pagina-inicial/pagina-inicial.css"              
    ],
    title: "Home | Let's Sign"
  },

  "/workflow/confirmar-dados": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/confirmar-dados/confirmar-dados.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/confirmar-dados/confirmar-dados.css" 
    ],
    script: "src/pages/workflow/confirmar-dados/confirmar-dados.js",
    title: "Confirmar Dados | Let's Sign",
    titulo: "Confirme os dados informados abaixo",
    passo: "Etapa 1 de 4"
  }
};
  export default routes;
  