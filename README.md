## 🚀 Como Executar
**Método 1:** Usando um servidor local simples (qualquer um):
1. Abra o projeto no **VSCode** e use a extensão **Live Server** (atalho: `Alt+L + Alt+O`).

**Método 2:** Sem instalar nada:
1. Garanta que o arquivo `index.html` está sendo servido via protocolo `http://` (não `file://`).  
   - No **Chrome**, você pode forçar isso abrindo o terminal na pasta do projeto e executando:  
     **Windows PowerShell:**
     ```bash
     Start-Process chrome "http://localhost:3000" ; python -m http.server 3000
     ```
     **Linux/macOS:**
     ```bash
     open -a "Google Chrome" "http://localhost:3000" & python3 -m http.server 3000
     ```

## ⚠️ Por que um servidor é necessário?
- **Fetch API não funciona com `file://`**: As requisições para carregar templates (`home.html`, etc.) serão bloqueadas pelo navegador se o arquivo for aberto diretamente (`index.html` duplo-clique).
- **Hash Routing**: Embora as rotas usem `#`, o carregamento inicial exige que o servidor retorne `index.html` para qualquer caminho.