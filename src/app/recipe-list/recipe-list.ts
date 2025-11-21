import { Component, Input, signal, computed, HostListener, OnInit } from '@angular/core';
import { RecipeCard } from '../recipe-card/recipe-card';
import { DataService, Recipe } from '../services/data.service';

interface RecipeLocal {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  @Input() limit?: number;
  @Input() title = 'Receitas em Destaque';
  @Input() category?: string;
  @Input() search?: string;
  @Input() excludeIds?: number[];
  currentIndex = signal(0);
  itemsPerView = signal(this.getItemsPerView());

  recipes: RecipeLocal[] = [
    {
      id: 1,
      title: 'Bolo de Cenoura',
      description: 'Bolo fofinho de cenoura com cobertura de chocolate',
      image: 'https://moinhoglobo.com.br/wp-content/uploads/2019/01/22-bolo-de-cenoura.png',
      prepTime: '50 min',
      difficulty: 'Fácil',
      category: 'Doces',
      ingredients: [
        '3 cenouras médias',
        '4 ovos',
        '2 xícaras de açúcar',
        '1 xícara de óleo',
        '2 xícaras de farinha de trigo',
        '1 colher de sopa de fermento'
      ],
      steps: [
        'Bata no liquidificador as cenouras, ovos, açúcar e óleo',
        'Despeje em uma tigela e misture a farinha',
        'Adicione o fermento e misture delicadamente',
        'Despeje em forma untada',
        'Asse em forno pré-aquecido a 180°C por 40 minutos',
        'Prepare a cobertura com chocolate e leite condensado',
        'Cubra o bolo ainda quente'
      ]
    },
    {
      id: 2,
      title: 'Pudim de Leite',
      description: 'Sobremesa cremosa e deliciosa',
      image: 'https://static.itdg.com.br/images/360-240/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-1-.jpg',
      prepTime: '1h',
      difficulty: 'Fácil',
      category: 'Doces',
      ingredients: [
        '1 lata de leite condensado',
        '2 latas de leite',
        '3 ovos',
        '1 xícara de açúcar para a calda'
      ],
      steps: [
        'Faça a calda com açúcar em uma forma',
        'Bata no liquidificador o leite condensado, leite e ovos',
        'Despeje na forma caramelizada',
        'Asse em banho-maria por 1 hora',
        'Deixe esfriar e desenforme'
      ]
    },
    {
      id: 3,
      title: 'Brigadeiro',
      description: 'Doce brasileiro clássico',
      image: 'https://atelierdossabores.com.br/zona-sul/wp-content/uploads/sites/6/2020/01/DOCINHO-BRIGADEIRO-GOURMET-ATELIER-DOS-SABORES.jpg',
      prepTime: '30 min',
      difficulty: 'Fácil',
      category: 'Doces',
      ingredients: [
        '1 lata de leite condensado',
        '1 colher de sopa de manteiga',
        '3 colheres de sopa de chocolate em pó',
        'Chocolate granulado'
      ],
      steps: [
        'Misture tudo em uma panela',
        'Cozinhe em fogo baixo mexendo sempre',
        'Quando desgrudar do fundo está pronto',
        'Deixe esfriar',
        'Faça bolinhas e passe no granulado'
      ]
    },
    {
      id: 4,
      title: 'Coxinha de Frango',
      description: 'Salgado tradicional brasileiro',
      image: 'https://vocegastro.com.br/app/uploads/2021/07/coxinha-de-frango.jpg.webp',
      prepTime: '1h 30min',
      difficulty: 'Médio',
      category: 'Salgados',
      ingredients: [
        '500g de frango desfiado',
        '2 xícaras de farinha de trigo',
        '2 xícaras de caldo de frango',
        '2 colheres de manteiga',
        'Sal a gosto',
        'Farinha de rosca'
      ],
      steps: [
        'Tempere o frango e cozinhe',
        'Faça a massa com caldo, farinha e manteiga',
        'Deixe esfriar a massa',
        'Modele as coxinhas com o recheio',
        'Passe na farinha de rosca',
        'Frite em óleo quente'
      ]
    },
    {
      id: 5,
      title: 'Pão de Queijo',
      description: 'Quitute mineiro irresistível',
      image: 'https://essareceitafunciona.com.br/wp-content/uploads/2022/07/Pao-de-queijo-Essa-Receita-Funciona-9.jpg',
      prepTime: '40 min',
      difficulty: 'Fácil',
      category: 'Salgados',
      ingredients: [
        '500g de polvilho azedo',
        '1 xícara de leite',
        '1/2 xícara de óleo',
        '2 ovos',
        '200g de queijo ralado',
        'Sal a gosto'
      ],
      steps: [
        'Ferva o leite com óleo e sal',
        'Despeje sobre o polvilho e misture',
        'Adicione os ovos um a um',
        'Misture o queijo',
        'Faça bolinhas',
        'Asse em forno pré-aquecido a 180°C por 30 minutos'
      ]
    },
    {
      id: 6,
      title: 'Arroz com Feijão',
      description: 'Dupla clássica da culinária brasileira',
      image: 'https://sabores-new.s3.amazonaws.com/public/2024/11/arroz-e-feijao.jpg',
      prepTime: '45 min',
      difficulty: 'Fácil',
      category: 'Acompanhamentos',
      ingredients: [
        '2 xícaras de arroz',
        '1 xícara de feijão',
        'Alho e cebola',
        'Sal e óleo',
        'Água'
      ],
      steps: [
        'Cozinhe o feijão na pressão por 20 minutos',
        'Refogue alho e adicione o arroz',
        'Adicione água (2 partes de água para 1 de arroz)',
        'Cozinhe até secar',
        'Tempere o feijão com alho e cebola'
      ]
    },
    {
      id: 7,
      title: 'Salada Verde',
      description: 'Salada fresca e saudável',
      image: 'https://s2-receitas.glbimg.com/pYCrlZ_hvPoZt8CZj6KSRW5-nOU=/0x0:729x486/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2021/a/c/nsTXnsQSKg34zqulko8Q/salada-colorida-com-frango.jpeg',
      prepTime: '15 min',
      difficulty: 'Fácil',
      category: 'Acompanhamentos',
      ingredients: [
        'Alface',
        'Tomate',
        'Pepino',
        'Cenoura',
        'Azeite',
        'Limão',
        'Sal'
      ],
      steps: [
        'Lave todos os vegetais',
        'Corte em pedaços',
        'Misture tudo',
        'Tempere com azeite, limão e sal'
      ]
    },
    {
      id: 8,
      title: 'Macarrão ao Alho e Óleo',
      description: 'Massa simples e rápida',
      image: 'https://sabores-new.s3.amazonaws.com/public/2024/11/prato_branco_com_macarrao.jpg',
      prepTime: '20 min',
      difficulty: 'Fácil',
      category: 'Massas',
      ingredients: [
        '500g de espaguete',
        '6 dentes de alho',
        '1/2 xícara de azeite',
        'Sal e pimenta',
        'Salsinha picada'
      ],
      steps: [
        'Cozinhe o macarrão em água com sal',
        'Doure o alho no azeite',
        'Misture o macarrão ao alho e óleo',
        'Adicione salsinha',
        'Sirva quente'
      ]
    },
    {
      id: 9,
      title: 'Omelete Simples',
      description: 'Café da manhã rápido e nutritivo',
      image: 'https://comidinhasdochef.com/wp-content/uploads/2022/01/Omelete-de-Ovo-Simples00.jpg',
      prepTime: '10 min',
      difficulty: 'Fácil',
      category: 'Salgados',
      ingredients: [
        '3 ovos',
        'Sal e pimenta',
        '1 tomate',
        'Queijo',
        'Presunto',
        'Manteiga'
      ],
      steps: [
        'Bata os ovos com sal e pimenta',
        'Pique tomate, queijo e presunto',
        'Aqueça a manteiga na frigideira',
        'Despeje os ovos',
        'Adicione o recheio',
        'Dobre ao meio e sirva'
      ]
    },
    {
      id: 10,
      title: 'Café Preto',
      description: 'Café coado tradicional',
      image: 'https://static.itdg.com.br/images/640-440/065963ee25ef92d07325b9b9b91db307/323731-original.jpg',
      prepTime: '10 min',
      difficulty: 'Fácil',
      category: 'Bebidas',
      ingredients: [
        'Café em pó',
        'Água',
        'Açúcar (opcional)'
      ],
      steps: [
        'Ferva a água',
        'Coloque o pó no filtro',
        'Despeje a água quente',
        'Adoce a gosto',
        'Sirva quente'
      ]
    },
    {
      id: 11,
      title: 'Suco de Laranja',
      description: 'Suco natural refrescante',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
      prepTime: '5 min',
      difficulty: 'Fácil',
      category: 'Bebidas',
      ingredients: [
        '4 laranjas',
        'Açúcar (opcional)',
        'Água gelada'
      ],
      steps: [
        'Corte as laranjas ao meio',
        'Esprema no espremedor',
        'Coe se preferir',
        'Adoce a gosto',
        'Sirva gelado'
      ]
    },
    {
      id: 12,
      title: 'Hambúrguer Caseiro',
      description: 'Lanche suculento feito em casa',
      image: 'https://assets.unileversolutions.com/recipes-v2/111189.jpg',
      prepTime: '30 min',
      difficulty: 'Fácil',
      category: 'Salgados',
      ingredients: [
        '500g de carne moída',
        'Pão de hambúrguer',
        'Queijo',
        'Alface',
        'Tomate',
        'Sal e pimenta'
      ],
      steps: [
        'Tempere a carne',
        'Modele os hambúrgueres',
        'Grelhe por 4 minutos cada lado',
        'Adicione queijo',
        'Monte o hambúrguer',
        'Sirva quente'
      ]
    }
  ];

  newRecipes: Recipe[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.newRecipes = this.dataService.getRecipes();
    this.dataService.recipes$.subscribe(recipes => {
      this.newRecipes = recipes;
    });
  }

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

  getDisplayedRecipes(): RecipeLocal[] {
    // Combinar receitas estáticas com novas receitas do serviço
    const allRecipes = [...this.recipes, ...this.newRecipes];
    
    let filtered = this.category 
      ? allRecipes.filter(r => r.category === this.category)
      : allRecipes;
    
    if (this.excludeIds && this.excludeIds.length > 0) {
      filtered = filtered.filter(r => !this.excludeIds!.includes(r.id));
    }
    
    if (this.search && this.search.trim() !== '') {
      const searchLower = this.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.category.toLowerCase().includes(searchLower)
      );
    }
    
    return this.limit ? filtered.slice(0, this.limit) : filtered;
  }
}
