import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';
import { RecipeList } from '../../components/recipe-list/recipe-list';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, RecipeList, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements OnInit {
  searchTerm: string = '';
  user: User | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.user = this.dataService.getUser();
    this.dataService.user$.subscribe(user => {
      this.user = user;
    });
  }

  getGreetingMessage(): string {
    if (this.user) {
      return `Bem-vindo, ${this.user.name}!`;
    }
    return 'Bem-vindo ao Sabor & Arte!';
  }

  getSubMessage(): string {
    if (this.user) {
      return 'Que bom ter você aqui! Confira as receitas especiais para você.';
    }
    return 'Descubra receitas deliciosas para o seu dia a dia';
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }
}
