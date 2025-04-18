import { loadComponent } from './loadComponent.js';

export const loadGlobalComponents = async () => {
  try {
    // Carrega Header
    await loadComponent(
      'header-container',
      'src/components/header/header.html',
      'src/components/header/header.css'
    );

    // Carrega Cards
    await loadComponent(
      'cards-container',
      'src/components/cards/cards.html',
      'src/components/cards/cards.css'
    );

  } catch (error) {
    console.error("Erro ao carregar componentes:", error);
  }
};