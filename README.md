# Let's Sign - Plataforma de Assinatura Digital

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

## 📌 Arquitetura do Projeto

### Single Page Application (SPA)
O projeto utiliza uma arquitetura SPA com:
- Roteamento baseado em hash (#)
- Carregamento dinâmico de templates, estilos e scripts
- Transições entre páginas sem reload completo

### Estrutura de Pastas
public/
└── user/
├── dados-exemplo.json # Modelo para preenchimento de dados
├── comprovante-exemplo.pdf # Modelo de comprovante de endereço
└── README.md # Instruções detalhadas


## 🔧 Funcionalidades Especiais

### Dev Bypass
Foram implementados atalhos para desenvolvimento em duas páginas:

1. **Valide sua Facial** (`/valide-sua-facial`):
   - Simulação de acesso à câmera
   - Bypass disponível quando executado em `localhost`

2. **Autenticação PIX** (`/autenticacao-pix`):
   - Simulação de leitura de QR Code
   - QR Code estático para demonstração da UI
   - Bypass disponível para pular a validação

### Dados de Exemplo
Na pasta `public/user` você encontra:
- Modelos de documentos para teste
- Instruções para preenchimento correto dos dados

## 🛠️ Dependências
- Nenhuma biblioteca externa (Vanilla JS)
- Requer servidor HTTP local para desenvolvimento

## 🌟 Recursos Implementados
- Fluxo de assinatura digital em 4 passos
- Validação facial simulada
- Autenticação via PIX (UI estática)
- Responsividade para mobile e desktop
- Controle de estado entre passos