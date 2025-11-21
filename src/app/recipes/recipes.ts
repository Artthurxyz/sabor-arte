import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeList } from '../recipe-list/recipe-list';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, Header, Footer, RecipeList],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {
  selectedCategory: string | undefined = undefined;
  searchTerm: string = '';

  categories = [
    { name: 'Todas', value: undefined, icon: '' },
    { name: 'Doces', value: 'Doces', icon: '' },
    { name: 'Salgados', value: 'Salgados', icon: '' },
    { name: 'Massas', value: 'Massas', icon: '' },
    { name: 'Acompanhamentos', value: 'Acompanhamentos', icon: '' },
    { name: 'Bebidas', value: 'Bebidas', icon: '' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchTerm = params['search'];
      }
    });
  }

  selectCategory(category: string | undefined) {
    this.selectedCategory = category;
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }
}
