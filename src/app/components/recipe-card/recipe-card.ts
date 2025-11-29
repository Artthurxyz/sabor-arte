import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
}

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() recipe!: Recipe;
  showDetails = false;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
