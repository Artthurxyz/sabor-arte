import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { RecipeList } from '../recipe-list/recipe-list';
import { Footer } from '../footer/footer';
import { SimpleReels } from '../simple-reels/simple-reels';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-home',
  imports: [Header, RecipeList, Footer, SimpleReels],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  public authService = inject(Auth);

  getGreetingMessage(): string {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) {
      greeting = 'Bom dia';
    } else if (hour < 18) {
      greeting = 'Boa tarde';
    } else {
      greeting = 'Boa noite';
    }

    const user = this.authService.getCurrentUser();
    if (user) {
      return `${greeting}, ${user.name}! 👋`;
    }
    return 'Bem-vindo ao Sabor&Arte!';
  }

  getSubMessage(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return 'Que tal criar uma nova obra-prima culinária hoje?';
    }
    return 'Onde cada prato é uma tela em branco e cada receita uma obra de arte. Desperte o artista que há em você na cozinha!';
  }
}
