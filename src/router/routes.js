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
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/confirmar-dados/confirmar-dados.js",
    ],
    title: "Confirme seus dados | Let's Sign",
    titulo: "Confirme os dados informados abaixo",
    passo: "Etapa 1 de 4"
  },

  "/workflow/comprovar-endereco": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/comprovar-endereco/comprovar-endereco.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/comprovar-endereco/comprovar-endereco.css" 
    ],
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/comprovar-endereco/comprovar-endereco.js",
    ],
    title: "Comprove seu endereço | Let's Sign",
    titulo: "Comprovante de endereço",
    passo: "Etapa 2 de 4"
  },

  "/workflow/valide-sua-facial": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/validacao-facial/validacao-facial.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/validacao-facial/validacao-facial.css" 
    ],
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/validacao-facial/validacao-facial.js",
    ],
    title: "Valide sua facial | Let's Sign",
    titulo: "Valide sua facial",
    passo: "Etapa 3 de 4"
  },

};
  export default routes;
  