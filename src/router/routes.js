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
      "src/pages/workflow/confirmar-dados/confirmar-dados.css",
      "src/shared/styles/progress-bar.css"
    ],
    scripts: [
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/confirmar-dados/confirmar-dados.js",
    ],
    step: 1,
    title: "Confirme seus dados | Let's Sign",
    titulo: "Confirme os dados informados abaixo",
    passo: "Etapa 1 de 4"
  },

  "/workflow/comprovar-endereco": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/comprovar-endereco/comprovar-endereco.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/comprovar-endereco/comprovar-endereco.css" ,
      "src/shared/styles/progress-bar.css"
    ],
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/comprovar-endereco/comprovar-endereco.js",
    ],
    step: 2,
    title: "Comprove seu endereço | Let's Sign",
    titulo: "Comprovante de endereço",
    passo: "Etapa 2 de 4"
  },

  "/workflow/valide-sua-facial": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/validacao-facial/validacao-facial.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/validacao-facial/validacao-facial.css",
      "src/shared/styles/progress-bar.css"
    ],
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/validacao-facial/validacao-facial.js",
    ],
    step: 3,
    title: "Valide sua facial | Let's Sign",
    titulo: "Valide sua facial",
    passo: "Etapa 3 de 4"
  },

  "/workflow/autenticacao-pix": {
    layout: "src/layouts/workflow-layout/workflow-layout.html",
    template: "src/pages/workflow/autenticacao-pix/autenticacao-pix.html", 
    styles: [
      "src/layouts/workflow-layout/workflow-layout.css",
      "src/pages/workflow/autenticacao-pix/autenticacao-pix.css" ,
      "src/shared/styles/progress-bar.css"
    ],
    scripts:[ 
      "src/layouts/workflow-layout/workflow-layout.js",
      "src/pages/workflow/autenticacao-pix/autenticacao-pix.js",
    ],
    step: 4,
    title: "Autenticação via PIX | Let's Sign",
    titulo: "Autenticação via PIX",
    passo: "Etapa 4 de 4"
  },

  "/assinatura-concluida": {
    layout: "src/layouts/final-layout/final-layout.html", 
    template: "src/pages/final/assinatura-concluida/assinatura-concluida.html",     
    styles: [
      "src/layouts/final-layout/final-layout.css",       
      "src/pages/final/assinatura-concluida/assinatura-concluida.css"              
    ],
    scripts: [
      "src/layouts/final-layout/final-layout.js"
    ],
    title: "Assinatura Concluída | Let's Sign"
  },


};
  export default routes;
  