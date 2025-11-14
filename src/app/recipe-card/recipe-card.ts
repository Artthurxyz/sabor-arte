import { Component, Input } from '@angular/core';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
}

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() recipe!: Recipe;
}
