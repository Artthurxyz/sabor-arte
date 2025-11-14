import { Component, signal, computed, HostListener } from '@angular/core';
import { RecipeCard } from '../recipe-card/recipe-card';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
}

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  title = 'Receitas em Destaque';
  currentIndex = signal(0);
  itemsPerView = signal(this.getItemsPerView());

  recipes: Recipe[] = [
    {
      id: 1,
      title: 'Bolo de Chocolate',
      description: 'Delicioso bolo de chocolate com cobertura cremosa',
      image: 'https://via.placeholder.com/300x200',
      prepTime: '45 min',
      difficulty: 'Médio'
    },
    {
      id: 2,
      title: 'Pizza Margherita',
      description: 'Pizza tradicional italiana com manjericão fresco',
      image: 'https://via.placeholder.com/300x200',
      prepTime: '30 min',
      difficulty: 'Fácil'
    },
    {
      id: 3,
      title: 'Lasanha Bolonhesa',
      description: 'Lasanha caseira com molho bolonhesa tradicional',
      image: 'https://via.placeholder.com/300x200',
      prepTime: '1h 20min',
      difficulty: 'Difícil'
    },
    {
      id: 4,
      title: 'Salada Caesar',
      description: 'Salada fresca com molho caesar e croutons',
      image: 'https://via.placeholder.com/300x200',
      prepTime: '15 min',
      difficulty: 'Fácil'
    },
    {
      id: 5,
      title: 'Risoto de Cogumelos',
      description: 'Risoto cremoso com cogumelos frescos',
      image: 'https://via.placeholder.com/300x200',
      prepTime: '40 min',
      difficulty: 'Médio'
    }
  ];

  totalSlides = computed(() => 
    Math.ceil(this.recipes.length / this.itemsPerView())
  );

  @HostListener('window:resize')
  onResize() {
    this.itemsPerView.set(this.getItemsPerView());
  }

  private getItemsPerView(): number {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  canNavigateLeft(): boolean {
    return this.currentIndex() > 0;
  }

  canNavigateRight(): boolean {
    return this.currentIndex() < this.totalSlides() - 1;
  }

  navigateLeft(): void {
    if (this.canNavigateLeft()) {
      this.currentIndex.update(i => i - 1);
    }
  }

  navigateRight(): void {
    if (this.canNavigateRight()) {
      this.currentIndex.update(i => i + 1);
    }
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }

  getIndicatorArray(): number[] {
    return Array.from({ length: this.totalSlides() }, (_, i) => i);
  }
}
