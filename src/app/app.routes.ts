import { Routes } from '@angular/router';
import { Recipes } from './pages/recipes/recipes';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { EsqueciSenha } from './pages/esqueci-senha/esqueci-senha';
import { AdicionarReceita } from './pages/adicionar-receita/adicionar-receita';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'receitas', component: Recipes },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'esqueci-senha', component: EsqueciSenha },
  { path: 'adicionar-receita', component: AdicionarReceita },
  { path: '**', redirectTo: '' }
];
