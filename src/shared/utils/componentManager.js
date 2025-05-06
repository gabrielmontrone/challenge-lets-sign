import { loadComponent } from './loadComponent.js';

export const loadGlobalComponents = async () => {
  try {
    // Carrega Header
    await loadComponent(
      'header-container',
      'src/shared/components/header/header.html',
      'src/shared/components/header/header.css'
    );

  } catch (error) {
    console.error("Erro ao carregar componentes:", error);
  }
};