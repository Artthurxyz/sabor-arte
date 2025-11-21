import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
}

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([
    {
      id: 2,
      title: 'Pizza Margherita',
      description: 'Pizza clássica italiana com molho de tomate e manjericão',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      category: 'Salgados',
      prepTime: '30 min',
      difficulty: 'Fácil',
      ingredients: ['Massa de pizza', 'Molho de tomate', 'Queijo', 'Manjericão'],
      steps: ['Prepare a massa', 'Adicione os ingredientes', 'Asse por 15 minutos']
    },
    {
      id: 4,
      title: 'Pão de Queijo',
      description: 'Quitute mineiro irresistível',
      image: 'https://essareceitafunciona.com.br/wp-content/uploads/2022/07/Pao-de-queijo-Essa-Receita-Funciona-9.jpg',
      category: 'Salgados',
      prepTime: '40 min',
      difficulty: 'Fácil',
      ingredients: ['Polvilho', 'Leite', 'Óleo', 'Ovos', 'Queijo'],
      steps: ['Faça a massa', 'Modele as bolinhas', 'Asse por 30 minutos']
    },
    {
      id: 5,
      title: 'Brigadeiro',
      description: 'Doce brasileiro clássico',
      image: 'https://atelierdossabores.com.br/zona-sul/wp-content/uploads/sites/6/2020/01/DOCINHO-BRIGADEIRO-GOURMET-ATELIER-DOS-SABORES.jpg',
      category: 'Doces',
      prepTime: '30 min',
      difficulty: 'Fácil',
      ingredients: ['Leite condensado', 'Manteiga', 'Chocolate em pó', 'Granulado'],
      steps: ['Cozinhe os ingredientes', 'Deixe esfriar', 'Faça bolinhas']
    }
  ]);

  private userSubject = new BehaviorSubject<User | null>(null);

  recipes$ = this.recipesSubject.asObservable();
  user$ = this.userSubject.asObservable();

  getRecipes(): Recipe[] {
    return this.recipesSubject.value;
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    const recipes = this.recipesSubject.value;
    const newRecipe: Recipe = {
      ...recipe,
      id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1
    };
    this.recipesSubject.next([...recipes, newRecipe]);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      this.userSubject.next(user);
      return user;
    }
    return this.userSubject.value;
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
