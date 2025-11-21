import { Routes } from '@angular/router';
import { Recipes } from './recipes/recipes';
import { Login } from './pages/login/login';
import { Cadastro } from './cadastro/cadastro';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { AdicionarReceita } from './adicionar-receita/adicionar-receita';
import { Feedback } from './feedback/feedback';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'receitas', component: Recipes },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'esqueci-senha', component: EsqueciSenha },
  { path: 'adicionar-receita', component: AdicionarReceita },
  { path: 'feedback', component: Feedback },
  { path: '**', redirectTo: '' }
];
