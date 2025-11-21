import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-adicionar-receita',
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './adicionar-receita.html',
  styleUrl: './adicionar-receita.css',
  standalone: true
})
export class AdicionarReceita {
  title: string = '';
  description: string = '';
  category: string = 'Doces';
  prepTime: string = '';
  difficulty: string = 'Fácil';
  ingredients: string = '';
  steps: string = '';
  imageUrl: string = '';

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  onSubmit() {
    const newRecipe = {
      title: this.title,
      description: this.description,
      category: this.category,
      prepTime: this.prepTime,
      difficulty: this.difficulty,
      ingredients: this.ingredients.split('\n').filter(i => i.trim()),
      steps: this.steps.split('\n').filter(s => s.trim()),
      image: this.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
    };
    
    this.dataService.addRecipe(newRecipe);
    alert('Receita publicada com sucesso!');
    this.router.navigate(['/receitas']);
  }
}
