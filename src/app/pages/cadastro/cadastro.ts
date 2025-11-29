import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterLink, Header, Footer],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
  standalone: true
})
export class Cadastro {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onCadastro() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Cadastro:', this.name, this.email);
    this.router.navigate(['/login']);
  }
}
